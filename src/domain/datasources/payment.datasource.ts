import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreatePaymentDto } from '../dtos/payment/create-payment.dto';
import { UpdatePaymentDto } from '../dtos/payment/update-payment.dto';
import { PaymentEntity } from '../entities/payment.entity';

export interface PaymentPaginationResult {
  page: number;
  limit: number;
  total: number;
  pages: number;
  next?: string | undefined;
  prev?: string | undefined;
  payments: PaymentEntity[];
}

export abstract class PaymentDatasource {
  abstract create(dto: CreatePaymentDto): Promise<PaymentEntity>;
  abstract findAll(dto: PaginationDto): Promise<PaymentPaginationResult>;
  abstract findById(id: string): Promise<PaymentEntity>;
  abstract findByOrderId(orderId: string): Promise<PaymentEntity[]>;
  abstract update(dto: UpdatePaymentDto): Promise<PaymentEntity>;
  abstract delete(id: string): Promise<PaymentEntity>;
}
