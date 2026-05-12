"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDiscountDto = void 0;
class CreateDiscountDto {
    name;
    percentage;
    startDate;
    endDate;
    constructor(name, percentage, startDate, endDate) {
        this.name = name;
        this.percentage = percentage;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    static create(object) {
        const { name, percentage, startDate, endDate } = object;
        if (!name)
            return ['Name property is required'];
        if (typeof name !== 'string' || name.trim().length === 0)
            return ['Name must be a non-empty string'];
        if (percentage === undefined || percentage === null)
            return ['Percentage property is required'];
        if (typeof percentage !== 'number' || percentage < 0 || percentage > 100) {
            return ['Percentage must be a number between 0 and 100'];
        }
        if (!startDate)
            return ['StartDate property is required'];
        if (!endDate)
            return ['EndDate property is required'];
        const parsedStart = new Date(startDate);
        const parsedEnd = new Date(endDate);
        if (isNaN(parsedStart.getTime()))
            return ['StartDate has an invalid format'];
        if (isNaN(parsedEnd.getTime()))
            return ['EndDate has an invalid format'];
        if (parsedEnd <= parsedStart)
            return ['EndDate must be after StartDate'];
        return [undefined, new CreateDiscountDto(name.trim(), percentage, parsedStart, parsedEnd)];
    }
}
exports.CreateDiscountDto = CreateDiscountDto;
//# sourceMappingURL=create-discount.dto.js.map