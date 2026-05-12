"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const cart_repository_impl_1 = require("../../infrastructure/repositories/cart.repository.impl");
const cart_prisma_datasource_impl_1 = require("../../infrastructure/datasources/cart-prisma.datasource.impl");
const postgres_database_1 = require("../../data/postgres/postgres-database");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const ownership_middleware_1 = require("../middlewares/ownership.middleware");
const role_type_1 = require("../../domain/types/role.type");
const winston_adapter_1 = require("../../config/adapters/winston.adapter");
class CartRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new cart_prisma_datasource_impl_1.CartPrismaDatasourceImpl(postgres_database_1.prisma);
        const repository = new cart_repository_impl_1.CartRepositoryImpl(datasource);
        const logger = (0, winston_adapter_1.buildLogger)('CartController');
        const controller = new controller_1.CartController(repository, logger);
        const roleMiddleware = new role_middleware_1.RoleMiddleware(postgres_database_1.prisma);
        router.post('/', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER), controller.create);
        router.get('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.cart), controller.getById);
        router.get('/user/:userId', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.cartByUserId), controller.getByUserId);
        router.get('/:id/items', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.cart), controller.getItems);
        router.delete('/:id/clear', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.cart), controller.clear);
        router.delete('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.cart), controller.delete);
        return router;
    }
}
exports.CartRoutes = CartRoutes;
//# sourceMappingURL=routes.js.map