import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepositoryImpl } from "../../infrastructure/repositories/auth.repository.impl";
import { AuthPrismaDatasourceImpl } from "../../infrastructure/datasources/auth-prisma.datasource.impl";
import { prisma } from "../../data/postgres/postgres-database";
import { buildLogger } from "../../config/adapters/winston.adapter";

export class AuthRoutes{
    
    static get routes(): Router{
        const router = Router();

        const datasource = new AuthPrismaDatasourceImpl(prisma);
        const repository = new AuthRepositoryImpl(datasource);
        const logger = buildLogger('AuthController');
        const controller = new AuthController(repository, logger);

        router.post('/register', controller.register);
        router.post('/login', controller.login);
        router.get('/check-auth', controller.checkAuth);

        return router;
    }
}