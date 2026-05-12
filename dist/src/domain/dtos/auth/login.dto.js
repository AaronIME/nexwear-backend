"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDto = void 0;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
class LoginDto {
    email;
    password;
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    static create(object) {
        const { email, password } = object;
        if (!email)
            return ['Email property is required'];
        if (!emailRegex.test(email))
            return ['Email has an invalid format'];
        if (!password)
            return ['Password property is required'];
        if (typeof password !== 'string' || password.trim().length === 0) {
            return ['Password must be a non-empty string'];
        }
        return [undefined, new LoginDto(email.toLowerCase().trim(), password)];
    }
}
exports.LoginDto = LoginDto;
//# sourceMappingURL=login.dto.js.map