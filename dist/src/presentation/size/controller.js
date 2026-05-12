"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeController = void 0;
const pagination_dto_1 = require("../../domain/dtos/pagination/pagination.dto");
const create_size_dto_1 = require("../../domain/dtos/size/create-size.dto");
const update_size_dto_1 = require("../../domain/dtos/size/update-size.dto");
const handle_error_1 = require("../../config/handle-error");
class SizeController {
    sizeRepository;
    logger;
    constructor(sizeRepository, logger) {
        this.sizeRepository = sizeRepository;
        this.logger = logger;
    }
    getAll = (req, res) => {
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = pagination_dto_1.PaginationDto.create({ page: +page, limit: +limit });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.sizeRepository
            .findAll(paginationDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getAll - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getById = (req, res) => {
        const { id } = req.params;
        this.sizeRepository
            .findById(String(id))
            .then((size) => res.status(200).json(size))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    create = (req, res) => {
        const [error, createSizeDto] = create_size_dto_1.CreateSizeDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.sizeRepository
            .create(createSizeDto)
            .then((size) => res.status(201).json(size))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    update = (req, res) => {
        const [error, updateSizeDto] = update_size_dto_1.UpdateSizeDto.create({ ...req.body, id: String(req.params.id) });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.sizeRepository
            .update(updateSizeDto)
            .then((size) => res.status(200).json(size))
            .catch((err) => {
            this.logger.error(`update - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.sizeRepository
            .delete(String(id))
            .then((size) => res.status(200).json(size))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.SizeController = SizeController;
//# sourceMappingURL=controller.js.map