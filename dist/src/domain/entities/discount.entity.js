"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class DiscountEntity {
    id;
    name;
    percentage;
    startDate;
    endDate;
    constructor(id, name, percentage, startDate, endDate) {
        this.id = id;
        this.name = name;
        this.percentage = percentage;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    static fromObject(object) {
        const { id, _id, name, percentage, startDate, endDate } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('Discount id is missing');
        if (!name)
            throw custom_error_1.CustomError.badRequest('Discount name is missing');
        if (percentage === undefined || percentage === null)
            throw custom_error_1.CustomError.badRequest('Discount percentage is missing');
        if (!startDate)
            throw custom_error_1.CustomError.badRequest('Discount startDate is missing');
        if (!endDate)
            throw custom_error_1.CustomError.badRequest('Discount endDate is missing');
        return new DiscountEntity(id ?? _id, name, percentage, new Date(startDate), new Date(endDate));
    }
}
exports.DiscountEntity = DiscountEntity;
//# sourceMappingURL=discount.entity.js.map