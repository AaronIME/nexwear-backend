"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const create_cart_dto_1 = require("../../domain/dtos/cart/create-cart.dto");
const handle_error_1 = require("../../config/handle-error");
class CartController {
    cartRepository;
    logger;
    constructor(cartRepository, logger) {
        this.cartRepository = cartRepository;
        this.logger = logger;
    }
    create = (req, res) => {
        const [error, createCartDto] = create_cart_dto_1.CreateCartDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.cartRepository
            .create(createCartDto)
            .then((cart) => res.status(201).json(cart))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getById = (req, res) => {
        const { id } = req.params;
        this.cartRepository
            .findById(String(id))
            .then((cart) => res.status(200).json(cart))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getByUserId = (req, res) => {
        const { userId } = req.params;
        this.cartRepository
            .findByUserId(String(userId))
            .then((cart) => res.status(200).json(cart))
            .catch((err) => {
            this.logger.error(`getByUserId - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getItems = (req, res) => {
        const { id } = req.params;
        this.cartRepository
            .getItems(String(id))
            .then((items) => res.status(200).json(items))
            .catch((err) => {
            this.logger.error(`getItems - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    clear = (req, res) => {
        const { id } = req.params;
        this.cartRepository
            .clear(String(id))
            .then(() => res.status(204).send())
            .catch((err) => {
            this.logger.error(`clear - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.cartRepository
            .delete(String(id))
            .then((cart) => res.status(200).json(cart))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.CartController = CartController;
//# sourceMappingURL=controller.js.map