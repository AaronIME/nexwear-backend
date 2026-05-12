"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandController = void 0;
const pagination_dto_1 = require("../../domain/dtos/pagination/pagination.dto");
const create_brand_dto_1 = require("../../domain/dtos/brand/create-brand.dto");
const update_brand_dto_1 = require("../../domain/dtos/brand/update-brand.dto");
const handle_error_1 = require("../../config/handle-error");
class BrandController {
    brandRepository;
    logger;
    constructor(brandRepository, logger) {
        this.brandRepository = brandRepository;
        this.logger = logger;
    }
    getAll = (req, res) => {
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = pagination_dto_1.PaginationDto.create({ page: +page, limit: +limit });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.brandRepository
            .findAll(paginationDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getAll - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getById = (req, res) => {
        const { id } = req.params;
        this.brandRepository
            .findById(String(id))
            .then((brand) => res.status(200).json(brand))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    create = (req, res) => {
        const [error, createBrandDto] = create_brand_dto_1.CreateBrandDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.brandRepository
            .create(createBrandDto)
            .then((brand) => res.status(201).json(brand))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    update = (req, res) => {
        const [error, updateBrandDto] = update_brand_dto_1.UpdateBrandDto.create({ ...req.body, id: String(req.params.id) });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.brandRepository
            .update(updateBrandDto)
            .then((brand) => res.status(200).json(brand))
            .catch((err) => {
            this.logger.error(`update - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.brandRepository
            .delete(String(id))
            .then((brand) => res.status(200).json(brand))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.BrandController = BrandController;
//# sourceMappingURL=controller.js.map