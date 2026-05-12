"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddressController = void 0;
const create_user_address_dto_1 = require("../../domain/dtos/user-address/create-user-address.dto");
const update_user_address_dto_1 = require("../../domain/dtos/user-address/update-user-address.dto");
const handle_error_1 = require("../../config/handle-error");
class UserAddressController {
    userAddressRepository;
    logger;
    constructor(userAddressRepository, logger) {
        this.userAddressRepository = userAddressRepository;
        this.logger = logger;
    }
    getById = (req, res) => {
        const { id } = req.params;
        this.userAddressRepository
            .findById(String(id))
            .then((address) => res.status(200).json(address))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getByUserId = (req, res) => {
        const { userId } = req.params;
        this.userAddressRepository
            .findByUserId(String(userId))
            .then((addresses) => res.status(200).json(addresses))
            .catch((err) => {
            this.logger.error(`getByUserId - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    create = (req, res) => {
        const [error, createUserAddressDto] = create_user_address_dto_1.CreateUserAddressDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.userAddressRepository
            .create(createUserAddressDto)
            .then((address) => res.status(201).json(address))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    setDefault = (req, res) => {
        const { id } = req.params;
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({ error: 'UserId property is required' });
            return;
        }
        this.userAddressRepository
            .setDefault(String(id), String(userId))
            .then((address) => res.status(200).json(address))
            .catch((err) => {
            this.logger.error(`setDefault - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    update = (req, res) => {
        const [error, updateUserAddressDto] = update_user_address_dto_1.UpdateUserAddressDto.create({ ...req.body, id: String(req.params.id) });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.userAddressRepository
            .update(updateUserAddressDto)
            .then((address) => res.status(200).json(address))
            .catch((err) => {
            this.logger.error(`update - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.userAddressRepository
            .delete(String(id))
            .then((address) => res.status(200).json(address))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.UserAddressController = UserAddressController;
//# sourceMappingURL=controller.js.map