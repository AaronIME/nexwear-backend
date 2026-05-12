"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantImageRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const product_variant_image_repository_impl_1 = require("../../infrastructure/repositories/product-variant-image.repository.impl");
const product_variant_image_prisma_datasource_impl_1 = require("../../infrastructure/datasources/product-variant-image-prisma.datasource.impl");
const postgres_database_1 = require("../../data/postgres/postgres-database");
const winston_adapter_1 = require("../../config/adapters/winston.adapter");
class ProductVariantImageRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new product_variant_image_prisma_datasource_impl_1.ProductVariantImagePrismaDatasourceImpl(postgres_database_1.prisma);
        const repository = new product_variant_image_repository_impl_1.ProductVariantImageRepositoryImpl(datasource);
        const logger = (0, winston_adapter_1.buildLogger)('ProductVariantImageController');
        const controller = new controller_1.ProductVariantImageController(repository, logger);
        router.post('/', controller.create);
        router.get('/:id', controller.findById);
        router.get('/variant/:productVariantId', controller.findByProductVariantId);
        router.put('/:id', controller.update);
        router.delete('/:id', controller.delete);
        return router;
    }
}
exports.ProductVariantImageRoutes = ProductVariantImageRoutes;
//# sourceMappingURL=routes.js.map