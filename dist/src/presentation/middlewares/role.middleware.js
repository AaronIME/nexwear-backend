"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMiddleware = void 0;
class RoleMiddleware {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    validateRole = (...allowedRoles) => {
        return async (req, res, next) => {
            const { userId } = req.body;
            console.log({ userId });
            if (!userId) {
                res.status(401).json({ error: 'Not userId provided' });
                return;
            }
            try {
                const user = await this.prisma.user.findUnique({ where: { id: userId } });
                if (!user) {
                    res.status(401).json({ error: 'User not found' });
                    return;
                }
                if (!allowedRoles.includes(user.role)) {
                    res.status(403).json({ error: 'Insufficient permissions' });
                    return;
                }
                req.body.role = user.role;
                next();
            }
            catch (error) {
                console.log({ error });
                res.status(500).json({ error: 'Internal server error' });
            }
        };
    };
}
exports.RoleMiddleware = RoleMiddleware;
//# sourceMappingURL=role.middleware.js.map