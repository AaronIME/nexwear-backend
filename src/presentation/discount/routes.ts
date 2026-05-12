import { Router } from 'express';

import { DiscountController } from './controller';
import { DiscountRepositoryImpl } from '../../infrastructure/repositories/discount.repository.impl';
import { DiscountPrismaDatasourceImpl } from '../../infrastructure/datasources/discount-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class DiscountRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new DiscountPrismaDatasourceImpl(prisma);
    const repository = new DiscountRepositoryImpl(datasource);
    const logger = buildLogger('DiscountController');
    const controller = new DiscountController(repository, logger);

    const roleMiddleware = new RoleMiddleware(prisma);

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.create);
    router.put('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.update);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.delete);

    return router;
  }
}
