"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserAddressDto = void 0;
class CreateUserAddressDto {
    userId;
    street;
    city;
    state;
    country;
    postalCode;
    isDefault;
    constructor(userId, street, city, state, country, postalCode, isDefault) {
        this.userId = userId;
        this.street = street;
        this.city = city;
        this.state = state;
        this.country = country;
        this.postalCode = postalCode;
        this.isDefault = isDefault;
    }
    static create(object) {
        const { userId, street, city, state, country, postalCode, isDefault = false } = object;
        if (!userId)
            return ['UserId property is required'];
        if (!street || typeof street !== 'string' || street.trim().length === 0)
            return ['Street property is required'];
        if (!city || typeof city !== 'string' || city.trim().length === 0)
            return ['City property is required'];
        if (!state || typeof state !== 'string' || state.trim().length === 0)
            return ['State property is required'];
        if (!country || typeof country !== 'string' || country.trim().length === 0)
            return ['Country property is required'];
        if (!postalCode || typeof postalCode !== 'string' || postalCode.trim().length === 0) {
            return ['PostalCode property is required'];
        }
        return [
            undefined,
            new CreateUserAddressDto(userId, street.trim(), city.trim(), state.trim(), country.trim(), postalCode.trim(), Boolean(isDefault)),
        ];
    }
}
exports.CreateUserAddressDto = CreateUserAddressDto;
//# sourceMappingURL=create-user-address.dto.js.map