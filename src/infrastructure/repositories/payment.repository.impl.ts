import { PaymentDatasource, PaymentPaginationResult } from '../../domain/datasources/payment.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreatePaymentDto } from '../../domain/dtos/payment/create-payment.dto';
import { UpdatePaymentDto } from '../../domain/dtos/payment/update-payment.dto';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { PaymentRepository } from '../../domain/repositories/payment.repository';

export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(private readonly datasource: PaymentDatasource) {}

  create(dto: CreatePaymentDto): Promise<PaymentEntity> {
    return this.datasource.create(dto);
  }

  findAll(dto: PaginationDto): Promise<PaymentPaginationResult> {
    return this.datasource.findAll(dto);
  }

  findById(id: string): Promise<PaymentEntity> {
    return this.datasource.findById(id);
  }

  findByOrderId(orderId: string): Promise<PaymentEntity[]> {
    return this.datasource.findByOrderId(orderId);
  }

  update(dto: UpdatePaymentDto): Promise<PaymentEntity> {
    return this.datasource.update(dto);
  }

  delete(id: string): Promise<PaymentEntity> {
    return this.datasource.delete(id);
  }
}
