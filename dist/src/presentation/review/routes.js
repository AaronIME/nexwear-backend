"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const review_repository_impl_1 = require("../../infrastructure/repositories/review.repository.impl");
const review_prisma_datasource_impl_1 = require("../../infrastructure/datasources/review-prisma.datasource.impl");
const postgres_database_1 = require("../../data/postgres/postgres-database");
const role_middleware_1 = require("../middlewares/role.middleware");
const role_type_1 = require("../../domain/types/role.type");
const winston_adapter_1 = require("../../config/adapters/winston.adapter");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const ownership_middleware_1 = require("../middlewares/ownership.middleware");
class ReviewRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new review_prisma_datasource_impl_1.ReviewPrismaDatasourceImpl(postgres_database_1.prisma);
        const repository = new review_repository_impl_1.ReviewRepositoryImpl(datasource);
        const logger = (0, winston_adapter_1.buildLogger)('ReviewController');
        const controller = new controller_1.ReviewController(repository, logger);
        const roleMiddleware = new role_middleware_1.RoleMiddleware(postgres_database_1.prisma);
        router.get('/', controller.getAll);
        router.get('/:id', controller.getById);
        router.get('/product/:productId', controller.getByProductId);
        router.get('/user/:userId', controller.getByUserId);
        router.post('/', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER), controller.create);
        router.put('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.review), controller.update);
        router.delete('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.review), controller.delete);
        return router;
    }
}
exports.ReviewRoutes = ReviewRoutes;
//# sourceMappingURL=routes.js.map