"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jwt_adapter_1 = require("../../config/adapters/jwt.adapter");
class AuthMiddleware {
    static async validateJwt(req, res, next) {
        const authorization = req.header('Authorization');
        if (!authorization) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }
        if (!authorization.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Invalid Bearer token' });
            return;
        }
        const token = authorization.split(' ').at(1) || '';
        try {
            const payload = await jwt_adapter_1.JwtAdapter.validateToken(token);
            if (!payload) {
                res.status(401).json({ error: 'Invalid token' });
                return;
            }
            req.body = req.body || {};
            req.body.userId = payload.id;
            console.log({ reqBody: req.body });
            next();
        }
        catch (error) {
            console.log({ error });
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map