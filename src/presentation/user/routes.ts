import { Router } from 'express';

import { UserController } from './controller';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { UserPrismaDatasourceImpl } from '../../infrastructure/datasources/user-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { OwnershipMiddleware, getResourceUserId } from '../middlewares/ownership.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new UserPrismaDatasourceImpl(prisma);
    const repository = new UserRepositoryImpl(datasource);
    const logger = buildLogger('UserController');
    const controller = new UserController(repository, logger);
    const roleMiddleware = new RoleMiddleware(prisma);

    router.get('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.getAll);
    router.get('/email/:email', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.getByEmail);
    router.get('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN),OwnershipMiddleware.validateOwnership(getResourceUserId.user), controller.getById);
    router.post('/', controller.create);
    router.put('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.user), controller.update);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.delete);

    return router;
  }
}
