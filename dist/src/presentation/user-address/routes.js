"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddressRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const user_address_repository_impl_1 = require("../../infrastructure/repositories/user-address.repository.impl");
const user_address_prisma_datasource_impl_1 = require("../../infrastructure/datasources/user-address-prisma.datasource.impl");
const postgres_database_1 = require("../../data/postgres/postgres-database");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const ownership_middleware_1 = require("../middlewares/ownership.middleware");
const role_type_1 = require("../../domain/types/role.type");
const winston_adapter_1 = require("../../config/adapters/winston.adapter");
class UserAddressRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new user_address_prisma_datasource_impl_1.UserAddressPrismaDatasourceImpl(postgres_database_1.prisma);
        const repository = new user_address_repository_impl_1.UserAddressRepositoryImpl(datasource);
        const logger = (0, winston_adapter_1.buildLogger)('UserAddressController');
        const controller = new controller_1.UserAddressController(repository, logger);
        const roleMiddleware = new role_middleware_1.RoleMiddleware(postgres_database_1.prisma);
        router.get('/user/:userId', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.userAddressByUserId), controller.getByUserId);
        router.get('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.userAddress), controller.getById);
        router.post('/', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER), controller.create);
        router.patch('/:id/default', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.userAddress), controller.setDefault);
        router.put('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.userAddress), controller.update);
        router.delete('/:id', auth_middleware_1.AuthMiddleware.validateJwt, roleMiddleware.validateRole(role_type_1.Role.USER, role_type_1.Role.ADMIN), ownership_middleware_1.OwnershipMiddleware.validateOwnership(ownership_middleware_1.getResourceUserId.userAddress), controller.delete);
        return router;
    }
}
exports.UserAddressRoutes = UserAddressRoutes;
//# sourceMappingURL=routes.js.map