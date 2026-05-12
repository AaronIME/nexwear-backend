"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const order_repository_impl_1 = require("../../infrastructure/repositories/order.repository.impl");
const order_prisma_datasource_impl_1 = require("../../infrastructure/datasources/order-prisma.datasource.impl");
const postgres_database_1 = require("../../data/postgres/postgres-database");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const ownership_middleware_1 = require("../middlewares/ownership.middleware");
const role_type_1 = require("../../domain/types/role.type");
const winston_adapter_1 = require("../../config/adapters/winston.adapter");
class OrderRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new order_prisma_datasource_impl_1.OrderPrismaDatasourceImpl(postgres_database_1.prisma);
        const repository = new order_repository_impl_1.OrderRepositoryImpl(datasource);
        const logger = (0, winston_adapter_1.buildLogger)('OrderController');
        const controller = new controller_1.OrderController(repository, logger);
        const roleMiddleware = new role_middleware_1.RoleMiddleware(postgres_database_1.prisma);
        router.get('/', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.ADMIN), controller.getAll);
        router.get('/user/:userId', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.orderByUserId), controller.getByUserId);
        router.get('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.order), controller.getById);
        router.get('/:id/items', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.order), controller.getItems);
        router.post('/', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER), controller.create);
        router.patch('/:id/status', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.ADMIN), controller.updateStatus);
        router.delete('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.ADMIN), controller.delete);
        return router;
    }
}
exports.OrderRoutes = OrderRoutes;
//# sourceMappingURL=routes.js.map