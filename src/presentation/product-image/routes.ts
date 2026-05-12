import { Router } from 'express';

import { ProductImageController } from './controller';
import { ProductImageRepositoryImpl } from '../../infrastructure/repositories/product-image.repository.impl';
import { ProductImagePrismaDatasourceImpl } from '../../infrastructure/datasources/product-image-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class ProductImageRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new ProductImagePrismaDatasourceImpl(prisma);
    const repository = new ProductImageRepositoryImpl(datasource);
    const logger = buildLogger('ProductImageController');
    const controller = new ProductImageController(repository, logger);

    const roleMiddleware = new RoleMiddleware(prisma);

    router.get('/product/:productId', controller.getByProductId);
    router.get('/:id', controller.getById);
    router.post('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.create);
    router.put('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.update);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.delete);

    return router;
  }
}
