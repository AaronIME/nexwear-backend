"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountController = void 0;
const pagination_dto_1 = require("../../domain/dtos/pagination/pagination.dto");
const create_discount_dto_1 = require("../../domain/dtos/discount/create-discount.dto");
const update_discount_dto_1 = require("../../domain/dtos/discount/update-discount.dto");
const handle_error_1 = require("../../config/handle-error");
class DiscountController {
    discountRepository;
    logger;
    constructor(discountRepository, logger) {
        this.discountRepository = discountRepository;
        this.logger = logger;
    }
    getAll = (req, res) => {
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = pagination_dto_1.PaginationDto.create({ page: +page, limit: +limit });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.discountRepository
            .findAll(paginationDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getAll - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getById = (req, res) => {
        const { id } = req.params;
        this.discountRepository
            .findById(String(id))
            .then((discount) => res.status(200).json(discount))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    create = (req, res) => {
        const [error, createDiscountDto] = create_discount_dto_1.CreateDiscountDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.discountRepository
            .create(createDiscountDto)
            .then((discount) => res.status(201).json(discount))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    update = (req, res) => {
        const [error, updateDiscountDto] = update_discount_dto_1.UpdateDiscountDto.create({ ...req.body, id: String(req.params.id) });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.discountRepository
            .update(updateDiscountDto)
            .then((discount) => res.status(200).json(discount))
            .catch((err) => {
            this.logger.error(`update - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.discountRepository
            .delete(String(id))
            .then((discount) => res.status(200).json(discount))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.DiscountController = DiscountController;
//# sourceMappingURL=controller.js.map