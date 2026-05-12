import { Router } from 'express';

import { TagController } from './controller';
import { TagRepositoryImpl } from '../../infrastructure/repositories/tag.repository.impl';
import { TagPrismaDatasourceImpl } from '../../infrastructure/datasources/tag-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class TagRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new TagPrismaDatasourceImpl(prisma);
    const repository = new TagRepositoryImpl(datasource);
    const logger = buildLogger('TagController');
    const controller = new TagController(repository, logger);

    const roleMiddleware = new RoleMiddleware(prisma);

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.create);
    router.put('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.update);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.delete);

    return router;
  }
}
