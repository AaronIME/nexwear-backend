"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const category_repository_impl_1 = require("../../infrastructure/repositories/category.repository.impl");
const category_prisma_datasource_impl_1 = require("../../infrastructure/datasources/category-prisma.datasource.impl");
const postgres_database_1 = require("../../data/postgres/postgres-database");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const role_type_1 = require("../../domain/types/role.type");
const winston_adapter_1 = require("../../config/adapters/winston.adapter");
class CategoryRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new category_prisma_datasource_impl_1.CategoryPrismaDatasourceImpl(postgres_database_1.prisma);
        const repository = new category_repository_impl_1.CategoryRepositoryImpl(datasource);
        const logger = (0, winston_adapter_1.buildLogger)('CategoryController');
        const controller = new controller_1.CategoryController(repository, logger);
        const roleMiddleware = new role_middleware_1.RoleMiddleware(postgres_database_1.prisma);
        router.get('/', controller.getAll);
        router.get('/:id', controller.getById);
        router.post('/', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.ADMIN), controller.create);
        router.put('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.ADMIN), controller.update);
        router.delete('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.ADMIN), controller.delete);
        return router;
    }
}
exports.CategoryRoutes = CategoryRoutes;
//# sourceMappingURL=routes.js.map