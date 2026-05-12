"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagController = void 0;
const pagination_dto_1 = require("../../domain/dtos/pagination/pagination.dto");
const create_tag_dto_1 = require("../../domain/dtos/tag/create-tag.dto");
const update_tag_dto_1 = require("../../domain/dtos/tag/update-tag.dto");
const handle_error_1 = require("../../config/handle-error");
class TagController {
    tagRepository;
    logger;
    constructor(tagRepository, logger) {
        this.tagRepository = tagRepository;
        this.logger = logger;
    }
    getAll = (req, res) => {
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = pagination_dto_1.PaginationDto.create({ page: +page, limit: +limit });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.tagRepository
            .findAll(paginationDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getAll - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getById = (req, res) => {
        const { id } = req.params;
        this.tagRepository
            .findById(String(id))
            .then((tag) => res.status(200).json(tag))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    create = (req, res) => {
        const [error, createTagDto] = create_tag_dto_1.CreateTagDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.tagRepository
            .create(createTagDto)
            .then((tag) => res.status(201).json(tag))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    update = (req, res) => {
        const [error, updateTagDto] = update_tag_dto_1.UpdateTagDto.create({ ...req.body, id: String(req.params.id) });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.tagRepository
            .update(updateTagDto)
            .then((tag) => res.status(200).json(tag))
            .catch((err) => {
            this.logger.error(`update - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.tagRepository
            .delete(String(id))
            .then((tag) => res.status(200).json(tag))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.TagController = TagController;
//# sourceMappingURL=controller.js.map