import { Router } from 'express';

import { ColorController } from './controller';
import { ColorRepositoryImpl } from '../../infrastructure/repositories/color.repository.impl';
import { ColorPrismaDatasourceImpl } from '../../infrastructure/datasources/color-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class ColorRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new ColorPrismaDatasourceImpl(prisma);
    const repository = new ColorRepositoryImpl(datasource);
    const logger = buildLogger('ColorController');
    const controller = new ColorController(repository, logger);

    const roleMiddleware = new RoleMiddleware(prisma);

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.create);
    router.put('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.update);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.delete);

    return router;
  }
}
