import { Router } from 'express';

import { CategoryController } from './controller';
import { CategoryRepositoryImpl } from '../../infrastructure/repositories/category.repository.impl';
import { CategoryPrismaDatasourceImpl } from '../../infrastructure/datasources/category-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new CategoryPrismaDatasourceImpl(prisma);
    const repository = new CategoryRepositoryImpl(datasource);
    const logger = buildLogger('CategoryController');
    const controller = new CategoryController(repository, logger);

    const roleMiddleware = new RoleMiddleware(prisma);

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.create);
    router.put('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.update);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.delete);

    return router;
  }
}
