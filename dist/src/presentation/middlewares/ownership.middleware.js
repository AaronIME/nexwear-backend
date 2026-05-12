"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResourceUserId = exports.OwnershipMiddleware = void 0;
const role_type_1 = require("../../domain/types/role.type");
const postgres_database_1 = require("../../data/postgres/postgres-database");
class OwnershipMiddleware {
    static validateOwnership = (getResourceUserId) => {
        return async (req, res, next) => {
            try {
                const { userId, role } = req.body;
                if (!userId) {
                    res.status(403).json({ error: 'Access denied' });
                    return;
                }
                if (role === role_type_1.Role.ADMIN) {
                    next();
                    return;
                }
                const resourceUserId = await getResourceUserId(req);
                if (!resourceUserId) {
                    res.status(403).json({ error: 'Access denied' });
                    return;
                }
                if (userId !== resourceUserId) {
                    res.status(403).json({ error: 'Access denied' });
                    return;
                }
                next();
            }
            catch (error) {
                res.status(403).json({ error: 'Access denied' });
            }
        };
    };
}
exports.OwnershipMiddleware = OwnershipMiddleware;
exports.getResourceUserId = {
    order: async (req) => {
        const order = await postgres_database_1.prisma.order.findUnique({
            where: { id: String(req.params.id) },
            select: { userId: true }
        });
        return order?.userId || null;
    },
    orderByUserId: async (req) => {
        return String(req.params.userId) || null;
    },
    userAddress: async (req) => {
        const address = await postgres_database_1.prisma.userAddress.findUnique({
            where: { id: String(req.params.id) },
            select: { userId: true }
        });
        return address?.userId || null;
    },
    userAddressByUserId: async (req) => {
        return String(req.params.userId) || null;
    },
    supportRequest: async (req) => {
        const support = await postgres_database_1.prisma.supportRequest.findUnique({
            where: { id: String(req.params.id) },
            select: { userId: true }
        });
        return support?.userId || null;
    },
    supportRequestByUserId: async (req) => {
        return String(req.params.userId) || null;
    },
    cart: async (req) => {
        const cart = await postgres_database_1.prisma.cart.findUnique({
            where: { id: String(req.params.id) },
            select: { userId: true }
        });
        return cart?.userId || null;
    },
    cartByUserId: async (req) => {
        return String(req.params.userId) || null;
    },
    cartItem: async (req) => {
        const cartItem = await postgres_database_1.prisma.cartItem.findUnique({
            where: { id: String(req.params.id) },
            include: { cart: { select: { userId: true } } }
        });
        return cartItem?.cart?.userId || null;
    },
    payment: async (req) => {
        const payment = await postgres_database_1.prisma.payment.findUnique({
            where: { id: String(req.params.id) },
            include: { order: { select: { userId: true } } }
        });
        return payment?.order?.userId || null;
    },
    paymentByOrderId: async (req) => {
        const order = await postgres_database_1.prisma.order.findUnique({
            where: { id: String(req.params.orderId) },
            select: { userId: true }
        });
        return order?.userId || null;
    },
    user: async (req) => {
        return String(req.params.id) || null;
    },
    review: async (req) => {
        const review = await postgres_database_1.prisma.review.findUnique({
            where: { id: String(req.params.id) },
            select: { userId: true }
        });
        return review?.userId || null;
    }
};
//# sourceMappingURL=ownership.middleware.js.map