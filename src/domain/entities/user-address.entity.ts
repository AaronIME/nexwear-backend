import { CustomError } from './errors/custom.error';

export class UserAddressEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly street: string,
    public readonly city: string,
    public readonly state: string,
    public readonly country: string,
    public readonly postalCode: string,
    public readonly isDefault: boolean,
  ) {}

  static fromObject(object: { [key: string]: any }): UserAddressEntity {
    const { id, _id, userId, street, city, state, country, postalCode, isDefault = false } = object;

    if (!id && !_id) throw CustomError.badRequest('UserAddress id is missing');
    if (!userId) throw CustomError.badRequest('UserAddress userId is missing');
    if (!street) throw CustomError.badRequest('UserAddress street is missing');
    if (!city) throw CustomError.badRequest('UserAddress city is missing');
    if (!state) throw CustomError.badRequest('UserAddress state is missing');
    if (!country) throw CustomError.badRequest('UserAddress country is missing');
    if (!postalCode) throw CustomError.badRequest('UserAddress postalCode is missing');

    return new UserAddressEntity(id ?? _id, userId, street, city, state, country, postalCode, isDefault);
  }
}
