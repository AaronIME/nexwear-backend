"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCartDto = void 0;
class CreateCartDto {
    userId;
    constructor(userId) {
        this.userId = userId;
    }
    static create(object) {
        const { userId } = object;
        if (!userId)
            return ['UserId property is required'];
        return [undefined, new CreateCartDto(userId)];
    }
}
exports.CreateCartDto = CreateCartDto;
//# sourceMappingURL=create-cart.dto.js.map