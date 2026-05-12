"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentPrismaDatasourceImpl = void 0;
const payment_entity_1 = require("../../domain/entities/payment.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
const payment_status_type_1 = require("../../domain/types/payment-status.type");
class PaymentPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const orderExists = await this.prisma.order.findUnique({ where: { id: dto.orderId } });
        if (!orderExists)
            throw custom_error_1.CustomError.notFound(`Order with id "${dto.orderId}" not found`);
        const payment = await this.prisma.payment.create({
            data: {
                orderId: dto.orderId ?? null,
                method: dto.method,
                status: payment_status_type_1.PaymentStatus.PENDING,
                amount: dto.amount ?? null,
                transactionId: dto.transactionId ?? null,
            },
        });
        return payment_entity_1.PaymentEntity.fromObject(payment);
    }
    async findAll(dto) {
        const { page, limit } = dto;
        const skip = (page - 1) * limit;
        const [total, payments] = await this.prisma.$transaction([
            this.prisma.payment.count(),
            this.prisma.payment.findMany({
                skip,
                take: limit,
                orderBy: { id: 'asc' },
            }),
        ]);
        const pages = Math.ceil(total / limit);
        return {
            page,
            limit,
            total,
            pages,
            next: page < pages ? `api/payments?page=${page + 1}&limit=${limit}` : undefined,
            prev: page > 1 ? `api/payments?page=${page - 1}&limit=${limit}` : undefined,
            payments: payments.map(payment_entity_1.PaymentEntity.fromObject),
        };
    }
    async findById(id) {
        const payment = await this.prisma.payment.findUnique({ where: { id } });
        if (!payment)
            throw custom_error_1.CustomError.notFound(`Payment with id "${id}" not found`);
        return payment_entity_1.PaymentEntity.fromObject(payment);
    }
    async findByOrderId(orderId) {
        const payments = await this.prisma.payment.findMany({
            where: { orderId },
            orderBy: { id: 'asc' },
        });
        return payments.map(payment_entity_1.PaymentEntity.fromObject);
    }
    async update(dto) {
        await this.findById(dto.id);
        const updated = await this.prisma.payment.update({
            where: { id: dto.id },
            data: {
                ...(dto.status && { status: dto.status }),
                ...(dto.transactionId && { transactionId: dto.transactionId }),
            },
        });
        return payment_entity_1.PaymentEntity.fromObject(updated);
    }
    async delete(id) {
        await this.findById(id);
        const deleted = await this.prisma.payment.delete({ where: { id } });
        return payment_entity_1.PaymentEntity.fromObject(deleted);
    }
}
exports.PaymentPrismaDatasourceImpl = PaymentPrismaDatasourceImpl;
//# sourceMappingURL=payment-prisma.datasource.impl.js.map