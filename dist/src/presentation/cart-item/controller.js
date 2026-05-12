"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemController = void 0;
const add_cart_item_dto_1 = require("../../domain/dtos/cart/add-cart-item.dto");
const update_cart_item_dto_1 = require("../../domain/dtos/cart/update-cart-item.dto");
const handle_error_1 = require("../../config/handle-error");
class CartItemController {
    cartItemRepository;
    logger;
    constructor(cartItemRepository, logger) {
        this.cartItemRepository = cartItemRepository;
        this.logger = logger;
    }
    addItem = (req, res) => {
        const [error, addCartItemDto] = add_cart_item_dto_1.AddCartItemDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.cartItemRepository
            .addItem(addCartItemDto)
            .then((item) => res.status(201).json(item))
            .catch((err) => {
            this.logger.error(`addItem - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getById = (req, res) => {
        const { id } = req.params;
        this.cartItemRepository
            .findById(String(id))
            .then((item) => res.status(200).json(item))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getByCartId = (req, res) => {
        const { cartId } = req.params;
        this.cartItemRepository
            .findByCartId(String(cartId))
            .then((items) => res.status(200).json(items))
            .catch((err) => {
            this.logger.error(`getByCartId - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    updateQuantity = (req, res) => {
        const [error, updateCartItemDto] = update_cart_item_dto_1.UpdateCartItemDto.create({ ...req.body, id: String(req.params.id) });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.cartItemRepository
            .updateQuantity(updateCartItemDto)
            .then((item) => res.status(200).json(item))
            .catch((err) => {
            this.logger.error(`updateQuantity - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    removeItem = (req, res) => {
        const { id } = req.params;
        this.cartItemRepository
            .removeItem(String(id))
            .then((item) => res.status(200).json(item))
            .catch((err) => {
            this.logger.error(`removeItem - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.CartItemController = CartItemController;
//# sourceMappingURL=controller.js.map