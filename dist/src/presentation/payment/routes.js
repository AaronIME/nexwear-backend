"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const payment_repository_impl_1 = require("../../infrastructure/repositories/payment.repository.impl");
const payment_prisma_datasource_impl_1 = require("../../infrastructure/datasources/payment-prisma.datasource.impl");
const postgres_database_1 = require("../../data/postgres/postgres-database");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const ownership_middleware_1 = require("../middlewares/ownership.middleware");
const role_type_1 = require("../../domain/types/role.type");
const winston_adapter_1 = require("../../config/adapters/winston.adapter");
class PaymentRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new payment_prisma_datasource_impl_1.PaymentPrismaDatasourceImpl(postgres_database_1.prisma);
        const repository = new payment_repository_impl_1.PaymentRepositoryImpl(datasource);
        const logger = (0, winston_adapter_1.buildLogger)('PaymentController');
        const controller = new controller_1.PaymentController(repository, logger);
        const roleMiddleware = new role_middleware_1.RoleMiddleware(postgres_database_1.prisma);
        router.get('/', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.ADMIN), controller.getAll);
        router.get('/order/:orderId', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.paymentByOrderId), controller.getByOrderId);
        router.get('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.payment), controller.getById);
        router.post('/', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER), controller.create);
        router.patch('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), controller.update);
        router.delete('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.ADMIN), controller.delete);
        return router;
    }
}
exports.PaymentRoutes = PaymentRoutes;
//# sourceMappingURL=routes.js.map