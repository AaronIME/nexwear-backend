"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const product_repository_impl_1 = require("../../infrastructure/repositories/product.repository.impl");
const product_prisma_datasource_impl_1 = require("../../infrastructure/datasources/product-prisma.datasource.impl");
const postgres_database_1 = require("../../data/postgres/postgres-database");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const role_type_1 = require("../../domain/types/role.type");
const winston_adapter_1 = require("../../config/adapters/winston.adapter");
class ProductRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new product_prisma_datasource_impl_1.ProductPrismaDatasourceImpl(postgres_database_1.prisma);
        const repository = new product_repository_impl_1.ProductRepositoryImpl(datasource);
        const logger = (0, winston_adapter_1.buildLogger)('ProductController');
        const controller = new controller_1.ProductController(repository, logger);
        const roleMiddleware = new role_middleware_1.RoleMiddleware(postgres_database_1.prisma);
        router.get('/', controller.getAll);
        router.get('/:id', controller.getById);
        router.post('/', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.ADMIN), controller.create);
        router.put('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.ADMIN), controller.update);
        router.delete('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.ADMIN), controller.delete);
        return router;
    }
}
exports.ProductRoutes = ProductRoutes;
//# sourceMappingURL=routes.js.map