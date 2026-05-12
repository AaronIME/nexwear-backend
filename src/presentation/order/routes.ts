import { Router } from 'express';

import { OrderController } from './controller';
import { OrderRepositoryImpl } from '../../infrastructure/repositories/order.repository.impl';
import { OrderPrismaDatasourceImpl } from '../../infrastructure/datasources/order-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { OwnershipMiddleware, getResourceUserId } from '../middlewares/ownership.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class OrderRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new OrderPrismaDatasourceImpl(prisma);
    const repository = new OrderRepositoryImpl(datasource);
    const logger = buildLogger('OrderController');
    const controller = new OrderController(repository, logger);
    const roleMiddleware = new RoleMiddleware(prisma);

    router.get('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.getAll);
    router.get('/user/:userId', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.orderByUserId), controller.getByUserId);
    router.get('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.order), controller.getById);
    router.get('/:id/items', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.order), controller.getItems);
    router.post('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER), controller.create);
    router.patch('/:id/status', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.updateStatus);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.delete);

    return router;
  }
}
