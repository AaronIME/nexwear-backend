import { PrismaClient } from '../../../generated/prisma/client';
import { PaymentDatasource, PaymentPaginationResult } from '../../domain/datasources/payment.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreatePaymentDto } from '../../domain/dtos/payment/create-payment.dto';
import { UpdatePaymentDto } from '../../domain/dtos/payment/update-payment.dto';
import { PaymentEntity } from '../../domain/entities/payment.entity';
export declare class PaymentPrismaDatasourceImpl implements PaymentDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(dto: CreatePaymentDto): Promise<PaymentEntity>;
    findAll(dto: PaginationDto): Promise<PaymentPaginationResult>;
    findById(id: string): Promise<PaymentEntity>;
    findByOrderId(orderId: string): Promise<PaymentEntity[]>;
    update(dto: UpdatePaymentDto): Promise<PaymentEntity>;
    delete(id: string): Promise<PaymentEntity>;
}
//# sourceMappingURL=payment-prisma.datasource.impl.d.ts.map