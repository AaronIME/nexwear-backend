import { Router } from 'express';

import { BrandController } from './controller';
import { BrandRepositoryImpl } from '../../infrastructure/repositories/brand.repository.impl';
import { BrandPrismaDatasourceImpl } from '../../infrastructure/datasources/brand-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class BrandRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new BrandPrismaDatasourceImpl(prisma);
    const repository = new BrandRepositoryImpl(datasource);
    const logger = buildLogger('BrandController');
    const controller = new BrandController(repository, logger);

    const roleMiddleware = new RoleMiddleware(prisma);

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.create);
    router.put('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.update);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.delete);

    return router;
  }
}
