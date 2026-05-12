import { CustomError } from './errors/custom.error';
import { SupportStatus } from '../types/support-status.type';

export class SupportRequestEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly subject: string,
    public readonly message: string,
    public readonly status: SupportStatus,
    public readonly createdAt: Date,
  ) {}

  static fromObject(object: { [key: string]: any }): SupportRequestEntity {
    const { id, _id, userId, subject, message, status, createdAt } = object;

    if (!id && !_id) throw CustomError.badRequest('SupportRequest id is missing');
    if (!userId) throw CustomError.badRequest('SupportRequest userId is missing');
    if (!subject) throw CustomError.badRequest('SupportRequest subject is missing');
    if (!message) throw CustomError.badRequest('SupportRequest message is missing');
    if (!status) throw CustomError.badRequest('SupportRequest status is missing');

    return new SupportRequestEntity(
      id ?? _id,
      userId,
      subject,
      message,
      status as SupportStatus,
      new Date(createdAt),
    );
  }
}
