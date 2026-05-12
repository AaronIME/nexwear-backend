"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationDto = void 0;
class PaginationDto {
    page;
    limit;
    constructor(page, limit) {
        this.page = page;
        this.limit = limit;
    }
    static create(object) {
        const { page = 1, limit = 10 } = object;
        const parsedPage = Number(page);
        const parsedLimit = Number(limit);
        if (isNaN(parsedPage) || parsedPage < 1)
            return ['Page must be a positive number'];
        if (isNaN(parsedLimit) || parsedLimit < 1)
            return ['Limit must be a positive number'];
        return [undefined, new PaginationDto(parsedPage, parsedLimit)];
    }
}
exports.PaginationDto = PaginationDto;
//# sourceMappingURL=pagination.dto.js.map