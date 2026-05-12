import { Router } from 'express';

import { SupportRequestController } from './controller';
import { SupportRequestRepositoryImpl } from '../../infrastructure/repositories/support-request.repository.impl';
import { SupportRequestPrismaDatasourceImpl } from '../../infrastructure/datasources/support-request-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { OwnershipMiddleware, getResourceUserId } from '../middlewares/ownership.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class SupportRequestRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new SupportRequestPrismaDatasourceImpl(prisma);
    const repository = new SupportRequestRepositoryImpl(datasource);
    const logger = buildLogger('SupportRequestController');
    const controller = new SupportRequestController(repository, logger);
    const roleMiddleware = new RoleMiddleware(prisma);

    router.get('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.getAll);
    router.get('/user/:userId', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.supportRequestByUserId), controller.getByUserId);
    router.get('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.supportRequest), controller.getById);
    router.post('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER), controller.create);
    router.patch('/:id/status', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.updateStatus);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.delete);

    return router;
  }
}
