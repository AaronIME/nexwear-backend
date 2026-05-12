"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_repository_impl_1 = require("../../infrastructure/repositories/auth.repository.impl");
const auth_prisma_datasource_impl_1 = require("../../infrastructure/datasources/auth-prisma.datasource.impl");
const postgres_database_1 = require("../../data/postgres/postgres-database");
const winston_adapter_1 = require("../../config/adapters/winston.adapter");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new auth_prisma_datasource_impl_1.AuthPrismaDatasourceImpl(postgres_database_1.prisma);
        const repository = new auth_repository_impl_1.AuthRepositoryImpl(datasource);
        const logger = (0, winston_adapter_1.buildLogger)('AuthController');
        const controller = new controller_1.AuthController(repository, logger);
        router.post('/register', controller.register);
        router.post('/login', controller.login);
        router.get('/check-auth', controller.checkAuth);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=routes.js.map