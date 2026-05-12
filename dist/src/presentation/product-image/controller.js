"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImageController = void 0;
const create_product_image_dto_1 = require("../../domain/dtos/product-image/create-product-image.dto");
const update_product_image_dto_1 = require("../../domain/dtos/product-image/update-product-image.dto");
const handle_error_1 = require("../../config/handle-error");
class ProductImageController {
    productImageRepository;
    logger;
    constructor(productImageRepository, logger) {
        this.productImageRepository = productImageRepository;
        this.logger = logger;
    }
    getById = (req, res) => {
        const { id } = req.params;
        this.productImageRepository
            .findById(String(id))
            .then((image) => res.status(200).json(image))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getByProductId = (req, res) => {
        const { productId } = req.params;
        this.productImageRepository
            .findByProductId(String(productId))
            .then((images) => res.status(200).json(images))
            .catch((err) => {
            this.logger.error(`getByProductId - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    create = (req, res) => {
        const [error, createProductImageDto] = create_product_image_dto_1.CreateProductImageDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.productImageRepository
            .create(createProductImageDto)
            .then((image) => res.status(201).json(image))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    update = (req, res) => {
        const [error, updateProductImageDto] = update_product_image_dto_1.UpdateProductImageDto.create({ ...req.body, id: String(req.params.id) });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.productImageRepository
            .update(updateProductImageDto)
            .then((image) => res.status(200).json(image))
            .catch((err) => {
            this.logger.error(`update - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.productImageRepository
            .delete(String(id))
            .then((image) => res.status(200).json(image))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.ProductImageController = ProductImageController;
//# sourceMappingURL=controller.js.map