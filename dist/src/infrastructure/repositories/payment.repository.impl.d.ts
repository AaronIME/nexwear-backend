import { PaymentDatasource, PaymentPaginationResult } from '../../domain/datasources/payment.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreatePaymentDto } from '../../domain/dtos/payment/create-payment.dto';
import { UpdatePaymentDto } from '../../domain/dtos/payment/update-payment.dto';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { PaymentRepository } from '../../domain/repositories/payment.repository';
export declare class PaymentRepositoryImpl implements PaymentRepository {
    private readonly datasource;
    constructor(datasource: PaymentDatasource);
    create(dto: CreatePaymentDto): Promise<PaymentEntity>;
    findAll(dto: PaginationDto): Promise<PaymentPaginationResult>;
    findById(id: string): Promise<PaymentEntity>;
    findByOrderId(orderId: string): Promise<PaymentEntity[]>;
    update(dto: UpdatePaymentDto): Promise<PaymentEntity>;
    delete(id: string): Promise<PaymentEntity>;
}
//# sourceMappingURL=payment.repository.impl.d.ts.map