import { CustomError } from './errors/custom.error';
import { PaymentMethod } from '../types/payment-method.type';
import { PaymentStatus } from '../types/payment-status.type';

export class PaymentEntity {
  constructor(
    public readonly id: string,
    public readonly orderId: string,
    public readonly method: PaymentMethod,
    public readonly status: PaymentStatus,
    public readonly amount: number,
    public readonly transactionId?: string,
  ) {}

  static fromObject(object: { [key: string]: any }): PaymentEntity {
    const { id, _id, orderId, method, status, amount, transactionId } = object;

    if (!id && !_id) throw CustomError.badRequest('Payment id is missing');
    if (!orderId) throw CustomError.badRequest('Payment orderId is missing');
    if (!method) throw CustomError.badRequest('Payment method is missing');
    if (!status) throw CustomError.badRequest('Payment status is missing');
    if (amount === undefined || amount === null) throw CustomError.badRequest('Payment amount is missing');

    return new PaymentEntity(
      id ?? _id,
      orderId,
      method as PaymentMethod,
      status as PaymentStatus,
      amount,
      transactionId,
    );
  }
}
