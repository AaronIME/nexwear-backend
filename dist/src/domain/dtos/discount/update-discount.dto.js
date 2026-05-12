"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDiscountDto = void 0;
class UpdateDiscountDto {
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
    static create(object) {
        const { id, name, percentage, startDate, endDate } = object;
        if (!id)
            return ['Id property is required'];
        if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
            return ['Name must be a non-empty string'];
        }
        if (percentage !== undefined && (typeof percentage !== 'number' || percentage < 0 || percentage > 100)) {
            return ['Percentage must be a number between 0 and 100'];
        }
        let parsedStart;
        let parsedEnd;
        if (startDate !== undefined) {
            parsedStart = new Date(startDate);
            if (isNaN(parsedStart.getTime()))
                return ['StartDate has an invalid format'];
        }
        if (endDate !== undefined) {
            parsedEnd = new Date(endDate);
            if (isNaN(parsedEnd.getTime()))
                return ['EndDate has an invalid format'];
        }
        if (parsedStart && parsedEnd && parsedEnd <= parsedStart) {
            return ['EndDate must be after StartDate'];
        }
        return [undefined, new UpdateDiscountDto(id, name?.trim(), percentage, parsedStart, parsedEnd)];
    }
}
exports.UpdateDiscountDto = UpdateDiscountDto;
//# sourceMappingURL=update-discount.dto.js.map