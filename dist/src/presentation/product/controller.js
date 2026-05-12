"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const pagination_dto_1 = require("../../domain/dtos/pagination/pagination.dto");
const filter_product_dto_1 = require("../../domain/dtos/product/filter-product.dto");
const create_product_dto_1 = require("../../domain/dtos/product/create-product.dto");
const update_product_dto_1 = require("../../domain/dtos/product/update-product.dto");
const handle_error_1 = require("../../config/handle-error");
class ProductController {
    productRepository;
    logger;
    constructor(productRepository, logger) {
        this.productRepository = productRepository;
        this.logger = logger;
    }
    getAll = (req, res) => {
        const { page = 1, limit = 10, ...filterParams } = req.query;
        const [paginationError, paginationDto] = pagination_dto_1.PaginationDto.create({ page: +page, limit: +limit });
        if (paginationError) {
            res.status(400).json({ error: paginationError });
            return;
        }
        const [filterError, filterDto] = filter_product_dto_1.FilterProductDto.create(filterParams);
        if (filterError) {
            res.status(400).json({ error: filterError });
            return;
        }
        this.productRepository
            .findAll(paginationDto, filterDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getAll - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getById = (req, res) => {
        const { id } = req.params;
        this.productRepository
            .findById(String(id))
            .then((product) => res.status(200).json(product))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    create = (req, res) => {
        const [error, createProductDto] = create_product_dto_1.CreateProductDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.productRepository
            .create(createProductDto)
            .then((product) => res.status(201).json(product))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    update = (req, res) => {
        const [error, updateProductDto] = update_product_dto_1.UpdateProductDto.create({ ...req.body, id: String(req.params.id) });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.productRepository
            .update(updateProductDto)
            .then((product) => res.status(200).json(product))
            .catch((err) => {
            this.logger.error(`update - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.productRepository
            .delete(String(id))
            .then((product) => res.status(200).json(product))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.ProductController = ProductController;
//# sourceMappingURL=controller.js.map