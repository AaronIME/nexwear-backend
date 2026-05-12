"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddressEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class UserAddressEntity {
    id;
    userId;
    street;
    city;
    state;
    country;
    postalCode;
    isDefault;
    constructor(id, userId, street, city, state, country, postalCode, isDefault) {
        this.id = id;
        this.userId = userId;
        this.street = street;
        this.city = city;
        this.state = state;
        this.country = country;
        this.postalCode = postalCode;
        this.isDefault = isDefault;
    }
    static fromObject(object) {
        const { id, _id, userId, street, city, state, country, postalCode, isDefault = false } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('UserAddress id is missing');
        if (!userId)
            throw custom_error_1.CustomError.badRequest('UserAddress userId is missing');
        if (!street)
            throw custom_error_1.CustomError.badRequest('UserAddress street is missing');
        if (!city)
            throw custom_error_1.CustomError.badRequest('UserAddress city is missing');
        if (!state)
            throw custom_error_1.CustomError.badRequest('UserAddress state is missing');
        if (!country)
            throw custom_error_1.CustomError.badRequest('UserAddress country is missing');
        if (!postalCode)
            throw custom_error_1.CustomError.badRequest('UserAddress postalCode is missing');
        return new UserAddressEntity(id ?? _id, userId, street, city, state, country, postalCode, isDefault);
    }
}
exports.UserAddressEntity = UserAddressEntity;
//# sourceMappingURL=user-address.entity.js.map