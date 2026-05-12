import { PaymentMethod } from '../../types/payment-method.type';

const validMethods = Object.values(PaymentMethod);

export class CreatePaymentDto {
  constructor(
    public readonly orderId: string,
    public readonly method: PaymentMethod,
    public readonly amount: number,
    public readonly transactionId?: string,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, CreatePaymentDto?] {
    const { orderId, method, amount, transactionId } = object;

    if (!orderId) return ['OrderId property is required'];

    if (!method) return ['Method property is required'];
    if (!validMethods.includes(method)) {
      return [`Method must be one of: ${validMethods.join(', ')}`];
    }

    if (amount === undefined || amount === null) return ['Amount property is required'];
    if (typeof amount !== 'number' || amount <= 0) return ['Amount must be a positive number'];

    return [undefined, new CreatePaymentDto(orderId, method as PaymentMethod, amount, transactionId)];
  }
}
