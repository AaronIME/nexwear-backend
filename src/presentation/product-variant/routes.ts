import { Router } from 'express';

import { ProductVariantController } from './controller';
import { ProductVariantRepositoryImpl } from '../../infrastructure/repositories/product-variant.repository.impl';
import { ProductVariantPrismaDatasourceImpl } from '../../infrastructure/datasources/product-variant-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class ProductVariantRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new ProductVariantPrismaDatasourceImpl(prisma);
    const repository = new ProductVariantRepositoryImpl(datasource);
    const logger = buildLogger('ProductVariantController');
    const controller = new ProductVariantController(repository, logger);

    const roleMiddleware = new RoleMiddleware(prisma);

    router.get('/product/:productId', controller.getByProductId);
    router.get('/:id', controller.getById);
    router.post('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.create);
    router.put('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.update);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.delete);

    return router;
  }
}
