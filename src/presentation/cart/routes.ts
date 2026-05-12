import { Router } from 'express';

import { CartController } from './controller';
import { CartRepositoryImpl } from '../../infrastructure/repositories/cart.repository.impl';
import { CartPrismaDatasourceImpl } from '../../infrastructure/datasources/cart-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { OwnershipMiddleware, getResourceUserId } from '../middlewares/ownership.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class CartRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new CartPrismaDatasourceImpl(prisma);
    const repository = new CartRepositoryImpl(datasource);
    const logger = buildLogger('CartController');
    const controller = new CartController(repository, logger);
    const roleMiddleware = new RoleMiddleware(prisma);

    router.post('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER), controller.create);
    router.get('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.cart), controller.getById);
    router.get('/user/:userId', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.cartByUserId), controller.getByUserId);
    router.get('/:id/items', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.cart), controller.getItems);
    router.delete('/:id/clear', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.cart), controller.clear);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.cart), controller.delete);

    return router;
  }
}
