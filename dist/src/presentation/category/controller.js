"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const pagination_dto_1 = require("../../domain/dtos/pagination/pagination.dto");
const create_category_dto_1 = require("../../domain/dtos/category/create-category.dto");
const update_category_dto_1 = require("../../domain/dtos/category/update-category.dto");
const handle_error_1 = require("../../config/handle-error");
class CategoryController {
    categoryRepository;
    logger;
    constructor(categoryRepository, logger) {
        this.categoryRepository = categoryRepository;
        this.logger = logger;
    }
    getAll = (req, res) => {
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = pagination_dto_1.PaginationDto.create({ page: +page, limit: +limit });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.categoryRepository
            .findAll(paginationDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getAll - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getById = (req, res) => {
        const { id } = req.params;
        this.categoryRepository
            .findById(String(id))
            .then((category) => res.status(200).json(category))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    create = (req, res) => {
        const [error, createCategoryDto] = create_category_dto_1.CreateCategoryDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.categoryRepository
            .create(createCategoryDto)
            .then((category) => res.status(201).json(category))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    update = (req, res) => {
        const [error, updateCategoryDto] = update_category_dto_1.UpdateCategoryDto.create({ ...req.body, id: String(req.params.id) });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.categoryRepository
            .update(updateCategoryDto)
            .then((category) => res.status(200).json(category))
            .catch((err) => {
            this.logger.error(`update - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.categoryRepository
            .delete(String(id))
            .then((category) => res.status(200).json(category))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=controller.js.map