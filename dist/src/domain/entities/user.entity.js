"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class UserEntity {
    id;
    name;
    email;
    role;
    createdAt;
    updatedAt;
    isActive;
    isDeleted;
    constructor(id, name, email, role, createdAt, updatedAt, isActive, isDeleted) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
    }
    static fromObject(object) {
        const { id, _id, name, email, role, createdAt, updatedAt, isActive = true, isDeleted = false, } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('User id is missing');
        if (!name)
            throw custom_error_1.CustomError.badRequest('User name is missing');
        if (!email)
            throw custom_error_1.CustomError.badRequest('User email is missing');
        if (!role)
            throw custom_error_1.CustomError.badRequest('User role is missing');
        return new UserEntity(id ?? _id, name, email, role, new Date(createdAt), new Date(updatedAt), Boolean(isActive), Boolean(isDeleted));
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map