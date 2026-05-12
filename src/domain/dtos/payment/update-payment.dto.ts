import { PaymentStatus } from '../../types/payment-status.type';

const validStatuses = Object.values(PaymentStatus);

export class UpdatePaymentDto {
  constructor(
    public readonly id: string,
    public readonly status?: PaymentStatus,
    public readonly transactionId?: string,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, UpdatePaymentDto?] {
    const { id, status, transactionId } = object;

    if (!id) return ['Id property is required'];

    if (status !== undefined && !validStatuses.includes(status)) {
      return [`Status must be one of: ${validStatuses.join(', ')}`];
    }

    return [undefined, new UpdatePaymentDto(id, status as PaymentStatus | undefined, transactionId)];
  }
}
