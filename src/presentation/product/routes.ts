import { Router } from 'express';

import { ProductController } from './controller';
import { ProductRepositoryImpl } from '../../infrastructure/repositories/product.repository.impl';
import { ProductPrismaDatasourceImpl } from '../../infrastructure/datasources/product-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new ProductPrismaDatasourceImpl(prisma);
    const repository = new ProductRepositoryImpl(datasource);
    const logger = buildLogger('ProductController');
    const controller = new ProductController(repository, logger);

    const roleMiddleware = new RoleMiddleware(prisma);

    router.get('/', controller.getAll);
    router.get('/random', controller.getRandom);
    router.get('/:id', controller.getById);
    router.post('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.create);
    router.put('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.update);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.delete);

    return router;
  }
}
