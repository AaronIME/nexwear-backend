"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const role_type_1 = require("../../types/role.type");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
class UpdateUserDto {
    id;
    name;
    email;
    password;
    role;
    constructor(id, name, email, password, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    static create(object) {
        const { id, name, email, password, role } = object;
        if (!id)
            return ['Id property is required'];
        if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
            return ['Name must be a non-empty string'];
        }
        if (email !== undefined && !emailRegex.test(email)) {
            return ['Email has an invalid format'];
        }
        if (password !== undefined && (typeof password !== 'string' || password.length < 6)) {
            return ['Password must be at least 6 characters'];
        }
        if (role !== undefined && !Object.values(role_type_1.Role).includes(role)) {
            return [`Role must be one of: ${Object.values(role_type_1.Role).join(', ')}`];
        }
        return [
            undefined,
            new UpdateUserDto(id, name?.trim(), email?.toLowerCase().trim(), password, role),
        ];
    }
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=update-user.dto.js.map