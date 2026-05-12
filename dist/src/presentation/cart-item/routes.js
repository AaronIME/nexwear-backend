"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const cart_item_repository_impl_1 = require("../../infrastructure/repositories/cart-item.repository.impl");
const cart_item_prisma_datasource_impl_1 = require("../../infrastructure/datasources/cart-item-prisma.datasource.impl");
const postgres_database_1 = require("../../data/postgres/postgres-database");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const ownership_middleware_1 = require("../middlewares/ownership.middleware");
const role_type_1 = require("../../domain/types/role.type");
const winston_adapter_1 = require("../../config/adapters/winston.adapter");
class CartItemRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new cart_item_prisma_datasource_impl_1.CartItemPrismaDatasourceImpl(postgres_database_1.prisma);
        const repository = new cart_item_repository_impl_1.CartItemRepositoryImpl(datasource);
        const logger = (0, winston_adapter_1.buildLogger)('CartItemController');
        const controller = new controller_1.CartItemController(repository, logger);
        const roleMiddleware = new role_middleware_1.RoleMiddleware(postgres_database_1.prisma);
        router.post('/', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER), controller.addItem);
        router.get('/cart/:cartId', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), controller.getByCartId);
        router.get('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.cartItem), controller.getById);
        router.put('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.cartItem), controller.updateQuantity);
        router.delete('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.cartItem), controller.removeItem);
        return router;
    }
}
exports.CartItemRoutes = CartItemRoutes;
//# sourceMappingURL=routes.js.map