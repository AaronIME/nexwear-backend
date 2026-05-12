"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportRequestController = void 0;
const pagination_dto_1 = require("../../domain/dtos/pagination/pagination.dto");
const create_support_request_dto_1 = require("../../domain/dtos/support-request/create-support-request.dto");
const update_support_request_dto_1 = require("../../domain/dtos/support-request/update-support-request.dto");
const handle_error_1 = require("../../config/handle-error");
class SupportRequestController {
    supportRequestRepository;
    logger;
    constructor(supportRequestRepository, logger) {
        this.supportRequestRepository = supportRequestRepository;
        this.logger = logger;
    }
    getAll = (req, res) => {
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = pagination_dto_1.PaginationDto.create({ page: +page, limit: +limit });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.supportRequestRepository
            .findAll(paginationDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getAll - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getById = (req, res) => {
        const { id } = req.params;
        this.supportRequestRepository
            .findById(String(id))
            .then((request) => res.status(200).json(request))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getByUserId = (req, res) => {
        const { userId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = pagination_dto_1.PaginationDto.create({ page: +page, limit: +limit });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.supportRequestRepository
            .findByUserId(String(userId), paginationDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getByUserId - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    create = (req, res) => {
        const [error, createSupportRequestDto] = create_support_request_dto_1.CreateSupportRequestDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.supportRequestRepository
            .create(createSupportRequestDto)
            .then((request) => res.status(201).json(request))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    updateStatus = (req, res) => {
        const [error, updateSupportRequestDto] = update_support_request_dto_1.UpdateSupportRequestDto.create({
            ...req.body,
            id: String(req.params.id),
        });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.supportRequestRepository
            .updateStatus(updateSupportRequestDto)
            .then((request) => res.status(200).json(request))
            .catch((err) => {
            this.logger.error(`updateStatus - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.supportRequestRepository
            .delete(String(id))
            .then((request) => res.status(200).json(request))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.SupportRequestController = SupportRequestController;
//# sourceMappingURL=controller.js.map