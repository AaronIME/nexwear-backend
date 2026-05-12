"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderDto = void 0;
const order_status_type_1 = require("../../types/order-status.type");
const validStatuses = Object.values(order_status_type_1.OrderStatus);
class UpdateOrderDto {
    id;
    status;
    constructor(id, status) {
        this.id = id;
        this.status = status;
    }
    static create(object) {
        const { id, status } = object;
        if (!id)
            return ['Id property is required'];
        if (!status)
            return ['Status property is required'];
        if (!validStatuses.includes(status)) {
            return [`Status must be one of: ${validStatuses.join(', ')}`];
        }
        return [undefined, new UpdateOrderDto(id, status)];
    }
}
exports.UpdateOrderDto = UpdateOrderDto;
//# sourceMappingURL=update-order.dto.js.map