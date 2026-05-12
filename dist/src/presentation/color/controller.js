"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorController = void 0;
const pagination_dto_1 = require("../../domain/dtos/pagination/pagination.dto");
const create_color_dto_1 = require("../../domain/dtos/color/create-color.dto");
const update_color_dto_1 = require("../../domain/dtos/color/update-color.dto");
const handle_error_1 = require("../../config/handle-error");
class ColorController {
    colorRepository;
    logger;
    constructor(colorRepository, logger) {
        this.colorRepository = colorRepository;
        this.logger = logger;
    }
    getAll = (req, res) => {
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = pagination_dto_1.PaginationDto.create({ page: +page, limit: +limit });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.colorRepository
            .findAll(paginationDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getAll - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getById = (req, res) => {
        const { id } = req.params;
        this.colorRepository
            .findById(String(id))
            .then((color) => res.status(200).json(color))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    create = (req, res) => {
        const [error, createColorDto] = create_color_dto_1.CreateColorDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.colorRepository
            .create(createColorDto)
            .then((color) => res.status(201).json(color))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    update = (req, res) => {
        const [error, updateColorDto] = update_color_dto_1.UpdateColorDto.create({ ...req.body, id: String(req.params.id) });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.colorRepository
            .update(updateColorDto)
            .then((color) => res.status(200).json(color))
            .catch((err) => {
            this.logger.error(`update - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.colorRepository
            .delete(String(id))
            .then((color) => res.status(200).json(color))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.ColorController = ColorController;
//# sourceMappingURL=controller.js.map