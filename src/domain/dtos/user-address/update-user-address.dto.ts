export class UpdateUserAddressDto {
  constructor(
    public readonly id: string,
    public readonly street?: string,
    public readonly city?: string,
    public readonly state?: string,
    public readonly country?: string,
    public readonly postalCode?: string,
    public readonly isDefault?: boolean,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, UpdateUserAddressDto?] {
    const { id, street, city, state, country, postalCode, isDefault } = object;

    if (!id) return ['Id property is required'];

    if (street !== undefined && (typeof street !== 'string' || street.trim().length === 0)) {
      return ['Street must be a non-empty string'];
    }
    if (city !== undefined && (typeof city !== 'string' || city.trim().length === 0)) {
      return ['City must be a non-empty string'];
    }
    if (state !== undefined && (typeof state !== 'string' || state.trim().length === 0)) {
      return ['State must be a non-empty string'];
    }
    if (country !== undefined && (typeof country !== 'string' || country.trim().length === 0)) {
      return ['Country must be a non-empty string'];
    }
    if (postalCode !== undefined && (typeof postalCode !== 'string' || postalCode.trim().length === 0)) {
      return ['PostalCode must be a non-empty string'];
    }

    return [
      undefined,
      new UpdateUserAddressDto(
        id,
        street?.trim(),
        city?.trim(),
        state?.trim(),
        country?.trim(),
        postalCode?.trim(),
        isDefault !== undefined ? Boolean(isDefault) : undefined,
      ),
    ];
  }
}
