"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const pagination_dto_1 = require("../../domain/dtos/pagination/pagination.dto");
const create_payment_dto_1 = require("../../domain/dtos/payment/create-payment.dto");
const update_payment_dto_1 = require("../../domain/dtos/payment/update-payment.dto");
const handle_error_1 = require("../../config/handle-error");
class PaymentController {
    paymentRepository;
    logger;
    constructor(paymentRepository, logger) {
        this.paymentRepository = paymentRepository;
        this.logger = logger;
    }
    getAll = (req, res) => {
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = pagination_dto_1.PaginationDto.create({ page: +page, limit: +limit });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.paymentRepository
            .findAll(paginationDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getAll - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getById = (req, res) => {
        const { id } = req.params;
        this.paymentRepository
            .findById(String(id))
            .then((payment) => res.status(200).json(payment))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getByOrderId = (req, res) => {
        const { orderId } = req.params;
        this.paymentRepository
            .findByOrderId(String(orderId))
            .then((payments) => res.status(200).json(payments))
            .catch((err) => {
            this.logger.error(`getByOrderId - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    create = (req, res) => {
        const [error, createPaymentDto] = create_payment_dto_1.CreatePaymentDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.paymentRepository
            .create(createPaymentDto)
            .then((payment) => res.status(201).json(payment))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    update = (req, res) => {
        const [error, updatePaymentDto] = update_payment_dto_1.UpdatePaymentDto.create({ ...req.body, id: String(req.params.id) });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.paymentRepository
            .update(updatePaymentDto)
            .then((payment) => res.status(200).json(payment))
            .catch((err) => {
            this.logger.error(`update - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.paymentRepository
            .delete(String(id))
            .then((payment) => res.status(200).json(payment))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=controller.js.map