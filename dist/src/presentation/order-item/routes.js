"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const order_item_repository_impl_1 = require("../../infrastructure/repositories/order-item.repository.impl");
const order_item_prisma_datasource_impl_1 = require("../../infrastructure/datasources/order-item-prisma.datasource.impl");
const postgres_database_1 = require("../../data/postgres/postgres-database");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const role_type_1 = require("../../domain/types/role.type");
const winston_adapter_1 = require("../../config/adapters/winston.adapter");
class OrderItemRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new order_item_prisma_datasource_impl_1.OrderItemPrismaDatasourceImpl(postgres_database_1.prisma);
        const repository = new order_item_repository_impl_1.OrderItemRepositoryImpl(datasource);
        const logger = (0, winston_adapter_1.buildLogger)('OrderItemController');
        const controller = new controller_1.OrderItemController(repository, logger);
        const roleMiddleware = new role_middleware_1.RoleMiddleware(postgres_database_1.prisma);
        router.get('/order/:orderId', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), controller.getByOrderId);
        router.get('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), controller.getById);
        return router;
    }
}
exports.OrderItemRoutes = OrderItemRoutes;
//# sourceMappingURL=routes.js.map