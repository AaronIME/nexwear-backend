import { PrismaClient } from '../../../generated/prisma/client';
import { PaymentDatasource, PaymentPaginationResult } from '../../domain/datasources/payment.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreatePaymentDto } from '../../domain/dtos/payment/create-payment.dto';
import { UpdatePaymentDto } from '../../domain/dtos/payment/update-payment.dto';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';
import { PaymentStatus } from '../../domain/types/payment-status.type';

export class PaymentPrismaDatasourceImpl implements PaymentDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreatePaymentDto): Promise<PaymentEntity> {
    const orderExists = await this.prisma.order.findUnique({ where: { id: dto.orderId } });
    if (!orderExists) throw CustomError.notFound(`Order with id "${dto.orderId}" not found`);

    const payment = await this.prisma.payment.create({
      data: {
        orderId: dto.orderId ?? null,
        method: dto.method,
        status: PaymentStatus.PENDING,
        amount: dto.amount ?? null,
        transactionId: dto.transactionId ?? null,
      },
    });

    return PaymentEntity.fromObject(payment);
  }

  async findAll(dto: PaginationDto): Promise<PaymentPaginationResult> {
    const { page, limit } = dto;
    const skip = (page - 1) * limit;

    const [total, payments] = await this.prisma.$transaction([
      this.prisma.payment.count(),
      this.prisma.payment.findMany({
        skip,
        take: limit,
        orderBy: { id: 'asc' },
      }),
    ]);

    const pages = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      pages,
      next: page < pages ? `api/payments?page=${page + 1}&limit=${limit}` : undefined,
      prev: page > 1 ? `api/payments?page=${page - 1}&limit=${limit}` : undefined,
      payments: payments.map(PaymentEntity.fromObject),
    };
  }

  async findById(id: string): Promise<PaymentEntity> {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) throw CustomError.notFound(`Payment with id "${id}" not found`);

    return PaymentEntity.fromObject(payment);
  }

  async findByOrderId(orderId: string): Promise<PaymentEntity[]> {
    const payments = await this.prisma.payment.findMany({
      where: { orderId },
      orderBy: { id: 'asc' },
    });

    return payments.map(PaymentEntity.fromObject);
  }

  async update(dto: UpdatePaymentDto): Promise<PaymentEntity> {
    await this.findById(dto.id);

    const updated = await this.prisma.payment.update({
      where: { id: dto.id },
      data: {
        ...(dto.status && { status: dto.status }),
        ...(dto.transactionId && { transactionId: dto.transactionId }),
      },
    });

    return PaymentEntity.fromObject(updated);
  }

  async delete(id: string): Promise<PaymentEntity> {
    await this.findById(id);

    const deleted = await this.prisma.payment.delete({ where: { id } });

    return PaymentEntity.fromObject(deleted);
  }
}
