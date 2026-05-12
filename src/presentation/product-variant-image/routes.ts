import { Router } from 'express';
import { ProductVariantImageController } from './controller';
import { ProductVariantImageRepositoryImpl } from '../../infrastructure/repositories/product-variant-image.repository.impl';
import { ProductVariantImagePrismaDatasourceImpl } from '../../infrastructure/datasources/product-variant-image-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';
import { buildLogger } from '../../config/adapters/winston.adapter';

export class ProductVariantImageRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new ProductVariantImagePrismaDatasourceImpl(prisma);
    const repository = new ProductVariantImageRepositoryImpl(datasource);
    const logger = buildLogger('ProductVariantImageController');
    const controller = new ProductVariantImageController(repository, logger);

    router.post('/', controller.create);
    router.get('/:id', controller.findById);
    router.get('/variant/:productVariantId', controller.findByProductVariantId);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
