import { Router } from 'express';

import { UserAddressController } from './controller';
import { UserAddressRepositoryImpl } from '../../infrastructure/repositories/user-address.repository.impl';
import { UserAddressPrismaDatasourceImpl } from '../../infrastructure/datasources/user-address-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { OwnershipMiddleware, getResourceUserId } from '../middlewares/ownership.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class UserAddressRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new UserAddressPrismaDatasourceImpl(prisma);
    const repository = new UserAddressRepositoryImpl(datasource);
    const logger = buildLogger('UserAddressController');
    const controller = new UserAddressController(repository, logger);
    const roleMiddleware = new RoleMiddleware(prisma);

    router.get('/user/:userId', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.userAddressByUserId), controller.getByUserId);
    router.get('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.userAddress), controller.getById);
    router.post('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER), controller.create);
    router.patch(
      '/:id/default',
      AuthMiddleware.validateJwt,
      roleMiddleware.validateRole(Role.USER, Role.ADMIN),
      OwnershipMiddleware.validateOwnership(getResourceUserId.userAddress),
      controller.setDefault,
    );
    router.put('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.userAddress), controller.update);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.userAddress), controller.delete);

    return router;
  }
}
