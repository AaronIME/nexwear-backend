import { Router } from 'express';

import { ReviewController } from './controller';
import { ReviewRepositoryImpl } from '../../infrastructure/repositories/review.repository.impl';
import { ReviewPrismaDatasourceImpl } from '../../infrastructure/datasources/review-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { OwnershipMiddleware, getResourceUserId } from '../middlewares/ownership.middleware';

export class ReviewRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new ReviewPrismaDatasourceImpl(prisma);
    const repository = new ReviewRepositoryImpl(datasource);
    const logger = buildLogger('ReviewController');
    const controller = new ReviewController(repository, logger);

    const roleMiddleware = new RoleMiddleware(prisma);

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.get('/product/:productId', controller.getByProductId);
    router.get('/user/:userId', controller.getByUserId);
    router.post('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER), controller.create);
    router.put('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.review), controller.update);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.review), controller.delete);

    return router;
  }
}
