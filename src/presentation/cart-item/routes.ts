import { Router } from 'express';

import { CartItemController } from './controller';
import { CartItemRepositoryImpl } from '../../infrastructure/repositories/cart-item.repository.impl';
import { CartItemPrismaDatasourceImpl } from '../../infrastructure/datasources/cart-item-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { OwnershipMiddleware, getResourceUserId } from '../middlewares/ownership.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class CartItemRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new CartItemPrismaDatasourceImpl(prisma);
    const repository = new CartItemRepositoryImpl(datasource);
    const logger = buildLogger('CartItemController');
    const controller = new CartItemController(repository, logger);
    const roleMiddleware = new RoleMiddleware(prisma);

    router.post('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER), controller.addItem);
    router.get('/cart/:cartId', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), controller.getByCartId);
    router.get('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.cartItem), controller.getById);
    router.put('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.cartItem), controller.updateQuantity);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.cartItem), controller.removeItem);

    return router;
  }
}
