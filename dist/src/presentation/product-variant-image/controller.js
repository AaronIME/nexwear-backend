"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantImageController = void 0;
const create_product_variant_image_dto_1 = require("../../domain/dtos/product-variant-image/create-product-variant-image.dto");
const update_product_variant_image_dto_1 = require("../../domain/dtos/product-variant-image/update-product-variant-image.dto");
const handle_error_1 = require("../../config/handle-error");
class ProductVariantImageController {
    productVariantImageRepository;
    logger;
    constructor(productVariantImageRepository, logger) {
        this.productVariantImageRepository = productVariantImageRepository;
        this.logger = logger;
    }
    create = (req, res) => {
        const [error, createDto] = create_product_variant_image_dto_1.CreateProductVariantImageDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.productVariantImageRepository
            .create(createDto)
            .then((productVariantImage) => res.status(201).json(productVariantImage))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    findById = (req, res) => {
        const { id } = req.params;
        if (!id || typeof id !== 'string') {
            res.status(400).json({ error: 'Id parameter is required and must be a string' });
            return;
        }
        this.productVariantImageRepository
            .findById(id)
            .then((productVariantImage) => res.status(200).json(productVariantImage))
            .catch((err) => {
            this.logger.error(`findById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    findByProductVariantId = (req, res) => {
        const { productVariantId } = req.params;
        if (!productVariantId || typeof productVariantId !== 'string') {
            res.status(400).json({ error: 'ProductVariantId parameter is required and must be a string' });
            return;
        }
        this.productVariantImageRepository
            .findByProductVariantId(productVariantId)
            .then((images) => res.status(200).json(images))
            .catch((err) => {
            this.logger.error(`findByProductVariantId - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    update = (req, res) => {
        const { id } = req.params;
        const [error, updateDto] = update_product_variant_image_dto_1.UpdateProductVariantImageDto.create({ ...req.body, id });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.productVariantImageRepository
            .update(updateDto)
            .then((productVariantImage) => res.status(200).json(productVariantImage))
            .catch((err) => {
            this.logger.error(`update - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        if (!id || typeof id !== 'string') {
            res.status(400).json({ error: 'Id parameter is required and must be a string' });
            return;
        }
        this.productVariantImageRepository
            .delete(id)
            .then((productVariantImage) => res.status(200).json(productVariantImage))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.ProductVariantImageController = ProductVariantImageController;
//# sourceMappingURL=controller.js.map