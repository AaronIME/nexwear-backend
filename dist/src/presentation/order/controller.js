"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const pagination_dto_1 = require("../../domain/dtos/pagination/pagination.dto");
const create_order_dto_1 = require("../../domain/dtos/order/create-order.dto");
const update_order_dto_1 = require("../../domain/dtos/order/update-order.dto");
const handle_error_1 = require("../../config/handle-error");
class OrderController {
    orderRepository;
    logger;
    constructor(orderRepository, logger) {
        this.orderRepository = orderRepository;
        this.logger = logger;
    }
    getAll = (req, res) => {
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = pagination_dto_1.PaginationDto.create({ page: +page, limit: +limit });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.orderRepository
            .findAll(paginationDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getAll - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getById = (req, res) => {
        const { id } = req.params;
        this.orderRepository
            .findById(String(id))
            .then((order) => res.status(200).json(order))
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
        this.orderRepository
            .findByUserId(String(userId), paginationDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getByUserId - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getItems = (req, res) => {
        const { id } = req.params;
        this.orderRepository
            .getItems(String(id))
            .then((items) => res.status(200).json(items))
            .catch((err) => {
            this.logger.error(`getItems - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    create = (req, res) => {
        const [error, createOrderDto] = create_order_dto_1.CreateOrderDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.orderRepository
            .create(createOrderDto)
            .then((order) => res.status(201).json(order))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    updateStatus = (req, res) => {
        const [error, updateOrderDto] = update_order_dto_1.UpdateOrderDto.create({ ...req.body, id: String(req.params.id) });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.orderRepository
            .updateStatus(updateOrderDto)
            .then((order) => res.status(200).json(order))
            .catch((err) => {
            this.logger.error(`updateStatus - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.orderRepository
            .delete(String(id))
            .then((order) => res.status(200).json(order))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.OrderController = OrderController;
//# sourceMappingURL=controller.js.map