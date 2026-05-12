import { SupportStatus } from '../../types/support-status.type';

const validStatuses = Object.values(SupportStatus);

export class UpdateSupportRequestDto {
  constructor(
    public readonly id: string,
    public readonly status: SupportStatus,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, UpdateSupportRequestDto?] {
    const { id, status } = object;

    if (!id) return ['Id property is required'];
    if (!status) return ['Status property is required'];
    if (!validStatuses.includes(status)) {
      return [`Status must be one of: ${validStatuses.join(', ')}`];
    }

    return [undefined, new UpdateSupportRequestDto(id, status as SupportStatus)];
  }
}
