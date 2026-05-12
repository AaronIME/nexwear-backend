"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const pagination_dto_1 = require("../../domain/dtos/pagination/pagination.dto");
const create_user_dto_1 = require("../../domain/dtos/user/create-user.dto");
const update_user_dto_1 = require("../../domain/dtos/user/update-user.dto");
const handle_error_1 = require("../../config/handle-error");
class UserController {
    userRepository;
    logger;
    constructor(userRepository, logger) {
        this.userRepository = userRepository;
        this.logger = logger;
    }
    getAll = (req, res) => {
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = pagination_dto_1.PaginationDto.create({ page: +page, limit: +limit });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.userRepository
            .findAll(paginationDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getAll - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getById = (req, res) => {
        const { id } = req.params;
        this.userRepository
            .findById(String(id))
            .then((user) => res.status(200).json(user))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getByEmail = (req, res) => {
        const { email } = req.params;
        this.userRepository
            .findByEmail(String(email))
            .then((user) => res.status(200).json(user))
            .catch((err) => {
            this.logger.error(`getByEmail - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    create = (req, res) => {
        const [error, createUserDto] = create_user_dto_1.CreateUserDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.userRepository
            .create(createUserDto)
            .then((user) => res.status(201).json(user))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    update = (req, res) => {
        const [error, updateUserDto] = update_user_dto_1.UpdateUserDto.create({ ...req.body, id: String(req.params.id) });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.userRepository
            .update(updateUserDto)
            .then((user) => res.status(200).json(user))
            .catch((err) => {
            this.logger.error(`update - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.userRepository
            .delete(String(id))
            .then((user) => res.status(200).json(user))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.UserController = UserController;
//# sourceMappingURL=controller.js.map