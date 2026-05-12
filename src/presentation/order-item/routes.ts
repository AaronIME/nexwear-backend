import { Router } from 'express';

import { OrderItemController } from './controller';
import { OrderItemRepositoryImpl } from '../../infrastructure/repositories/order-item.repository.impl';
import { OrderItemPrismaDatasourceImpl } from '../../infrastructure/datasources/order-item-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { OwnershipMiddleware, getResourceUserId } from '../middlewares/ownership.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class OrderItemRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new OrderItemPrismaDatasourceImpl(prisma);
    const repository = new OrderItemRepositoryImpl(datasource);
    const logger = buildLogger('OrderItemController');
    const controller = new OrderItemController(repository, logger);
    const roleMiddleware = new RoleMiddleware(prisma);

    router.get('/order/:orderId', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), controller.getByOrderId);
    router.get('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), controller.getById);

    return router;
  }
}
