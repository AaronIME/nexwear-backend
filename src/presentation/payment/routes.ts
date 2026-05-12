import { Router } from 'express';

import { PaymentController } from './controller';
import { PaymentRepositoryImpl } from '../../infrastructure/repositories/payment.repository.impl';
import { PaymentPrismaDatasourceImpl } from '../../infrastructure/datasources/payment-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { OwnershipMiddleware, getResourceUserId } from '../middlewares/ownership.middleware';
import { Role } from '../../domain/types/role.type';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class PaymentRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new PaymentPrismaDatasourceImpl(prisma);
    const repository = new PaymentRepositoryImpl(datasource);
    const logger = buildLogger('PaymentController');
    const controller = new PaymentController(repository, logger);
    const roleMiddleware = new RoleMiddleware(prisma);

    router.get('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.getAll);
    router.get('/order/:orderId', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.paymentByOrderId), controller.getByOrderId);
    router.get('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), OwnershipMiddleware.validateOwnership(getResourceUserId.payment), controller.getById);
    router.post('/', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER), controller.create);
    router.patch('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.USER, Role.ADMIN), controller.update);
    router.delete('/:id', AuthMiddleware.validateJwt, roleMiddleware.validateRole(Role.ADMIN), controller.delete);

    return router;
  }
}
