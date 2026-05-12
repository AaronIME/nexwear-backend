"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const role_type_1 = require("../../types/role.type");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
class CreateUserDto {
    name;
    email;
    password;
    role;
    constructor(name, email, password, role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    static create(object) {
        const { name, email, password, role = role_type_1.Role.USER } = object;
        if (!name)
            return ['Name property is required'];
        if (typeof name !== 'string' || name.trim().length === 0)
            return ['Name must be a non-empty string'];
        if (!email)
            return ['Email property is required'];
        if (!emailRegex.test(email))
            return ['Email has an invalid format'];
        if (!password)
            return ['Password property is required'];
        if (typeof password !== 'string' || password.length < 6)
            return ['Password must be at least 6 characters'];
        if (!Object.values(role_type_1.Role).includes(role))
            return [`Role must be one of: ${Object.values(role_type_1.Role).join(', ')}`];
        return [undefined, new CreateUserDto(name.trim(), email.toLowerCase().trim(), password, role)];
    }
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map