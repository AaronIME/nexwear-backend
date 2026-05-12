"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAdapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_adapter_1 = require("./env.adapter");
class JwtAdapter {
    static generateToken = (payload, duration = '2h') => {
        return new Promise((resolve) => {
            jsonwebtoken_1.default.sign(payload, env_adapter_1.envs.JWT_SEED, { expiresIn: duration }, (error, token) => {
                if (error) {
                    resolve(null);
                    return;
                }
                resolve(token);
            });
        });
    };
    static validateToken = (token) => {
        return new Promise((resolve) => {
            jsonwebtoken_1.default.verify(token, env_adapter_1.envs.JWT_SEED, (error, decoded) => {
                if (error) {
                    resolve(null);
                    return;
                }
                resolve(decoded);
            });
        });
    };
}
exports.JwtAdapter = JwtAdapter;
//# sourceMappingURL=jwt.adapter.js.map