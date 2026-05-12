"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const brand_repository_impl_1 = require("../../infrastructure/repositories/brand.repository.impl");
const brand_prisma_datasource_impl_1 = require("../../infrastructure/datasources/brand-prisma.datasource.impl");
const postgres_database_1 = require("../../data/postgres/postgres-database");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const role_type_1 = require("../../domain/types/role.type");
const winston_adapter_1 = require("../../config/adapters/winston.adapter");
class BrandRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new brand_prisma_datasource_impl_1.BrandPrismaDatasourceImpl(postgres_database_1.prisma);
        const repository = new brand_repository_impl_1.BrandRepositoryImpl(datasource);
        const logger = (0, winston_adapter_1.buildLogger)('BrandController');
        const controller = new controller_1.BrandController(repository, logger);
        const roleMiddleware = new role_middleware_1.RoleMiddleware(postgres_database_1.prisma);
        router.get('/', controller.getAll);
        router.get('/:id', controller.getById);
        router.post('/', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.ADMIN), controller.create);
        router.put('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.ADMIN), controller.update);
        router.delete('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.ADMIN), controller.delete);
        return router;
    }
}
exports.BrandRoutes = BrandRoutes;
//# sourceMappingURL=routes.js.map