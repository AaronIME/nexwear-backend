"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDto = void 0;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
class RegisterDto {
    name;
    email;
    password;
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static create(object) {
        const { name, email, password } = object;
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
        return [undefined, new RegisterDto(name.trim(), email.toLowerCase().trim(), password)];
    }
}
exports.RegisterDto = RegisterDto;
//# sourceMappingURL=register.dto.js.map