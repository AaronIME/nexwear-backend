export class CreateUserAddressDto {
  constructor(
    public readonly userId: string,
    public readonly street: string,
    public readonly city: string,
    public readonly state: string,
    public readonly country: string,
    public readonly postalCode: string,
    public readonly isDefault: boolean,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, CreateUserAddressDto?] {
    const { userId, street, city, state, country, postalCode, isDefault = false } = object;

    if (!userId) return ['UserId property is required'];
    if (!street || typeof street !== 'string' || street.trim().length === 0) return ['Street property is required'];
    if (!city || typeof city !== 'string' || city.trim().length === 0) return ['City property is required'];
    if (!state || typeof state !== 'string' || state.trim().length === 0) return ['State property is required'];
    if (!country || typeof country !== 'string' || country.trim().length === 0) return ['Country property is required'];
    if (!postalCode || typeof postalCode !== 'string' || postalCode.trim().length === 0) {
      return ['PostalCode property is required'];
    }

    return [
      undefined,
      new CreateUserAddressDto(
        userId,
        street.trim(),
        city.trim(),
        state.trim(),
        country.trim(),
        postalCode.trim(),
        Boolean(isDefault),
      ),
    ];
  }
}
