"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemController = void 0;
const handle_error_1 = require("../../config/handle-error");
class OrderItemController {
    orderItemRepository;
    logger;
    constructor(orderItemRepository, logger) {
        this.orderItemRepository = orderItemRepository;
        this.logger = logger;
    }
    getById = (req, res) => {
        const { id } = req.params;
        this.orderItemRepository
            .findById(String(id))
            .then((item) => res.status(200).json(item))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getByOrderId = (req, res) => {
        const { orderId } = req.params;
        this.orderItemRepository
            .findByOrderId(String(orderId))
            .then((items) => res.status(200).json(items))
            .catch((err) => {
            this.logger.error(`getByOrderId - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.OrderItemController = OrderItemController;
//# sourceMappingURL=controller.js.map