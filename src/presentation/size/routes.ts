import { Router } from 'express';

import { SizeController } from './controller';
import { SizeRepositoryImpl } from '../../infrastructure/repositories/size.repository.impl';
import { SizePrismaDatasourceImpl } from '../../infrastructure/datasources/size-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class SizeRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new SizePrismaDatasourceImpl(prisma);
    const repository = new SizeRepositoryImpl(datasource);
    const logger = buildLogger('SizeController');
    const controller = new SizeController(repository, logger);

    const roleMiddleware = new RoleMiddleware(prisma);

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.create);
    router.put('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.update);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.delete);

    return router;
  }
}
