"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialController = void 0;
const pagination_dto_1 = require("../../domain/dtos/pagination/pagination.dto");
const create_material_dto_1 = require("../../domain/dtos/material/create-material.dto");
const update_material_dto_1 = require("../../domain/dtos/material/update-material.dto");
const handle_error_1 = require("../../config/handle-error");
class MaterialController {
    materialRepository;
    logger;
    constructor(materialRepository, logger) {
        this.materialRepository = materialRepository;
        this.logger = logger;
    }
    getAll = (req, res) => {
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = pagination_dto_1.PaginationDto.create({ page: +page, limit: +limit });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.materialRepository
            .findAll(paginationDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getAll - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getById = (req, res) => {
        const { id } = req.params;
        this.materialRepository
            .findById(String(id))
            .then((material) => res.status(200).json(material))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    create = (req, res) => {
        const [error, createMaterialDto] = create_material_dto_1.CreateMaterialDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.materialRepository
            .create(createMaterialDto)
            .then((material) => res.status(201).json(material))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    update = (req, res) => {
        const [error, updateMaterialDto] = update_material_dto_1.UpdateMaterialDto.create({ ...req.body, id: String(req.params.id) });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.materialRepository
            .update(updateMaterialDto)
            .then((material) => res.status(200).json(material))
            .catch((err) => {
            this.logger.error(`update - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.materialRepository
            .delete(String(id))
            .then((material) => res.status(200).json(material))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.MaterialController = MaterialController;
//# sourceMappingURL=controller.js.map