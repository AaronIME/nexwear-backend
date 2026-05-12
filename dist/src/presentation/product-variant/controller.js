"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantController = void 0;
const create_product_variant_dto_1 = require("../../domain/dtos/product-variant/create-product-variant.dto");
const update_product_variant_dto_1 = require("../../domain/dtos/product-variant/update-product-variant.dto");
const handle_error_1 = require("../../config/handle-error");
class ProductVariantController {
    productVariantRepository;
    logger;
    constructor(productVariantRepository, logger) {
        this.productVariantRepository = productVariantRepository;
        this.logger = logger;
    }
    getById = (req, res) => {
        const { id } = req.params;
        this.productVariantRepository
            .findById(String(id))
            .then((variant) => res.status(200).json(variant))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getByProductId = (req, res) => {
        const { productId } = req.params;
        this.productVariantRepository
            .findByProductId(String(productId))
            .then((variants) => res.status(200).json(variants))
            .catch((err) => {
            this.logger.error(`getByProductId - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    create = (req, res) => {
        const [error, createProductVariantDto] = create_product_variant_dto_1.CreateProductVariantDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.productVariantRepository
            .create(createProductVariantDto)
            .then((variant) => res.status(201).json(variant))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    update = (req, res) => {
        const [error, updateProductVariantDto] = update_product_variant_dto_1.UpdateProductVariantDto.create({
            ...req.body,
            id: String(req.params.id),
        });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.productVariantRepository
            .update(updateProductVariantDto)
            .then((variant) => res.status(200).json(variant))
            .catch((err) => {
            this.logger.error(`update - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.productVariantRepository
            .delete(String(id))
            .then((variant) => res.status(200).json(variant))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.ProductVariantController = ProductVariantController;
//# sourceMappingURL=controller.js.map