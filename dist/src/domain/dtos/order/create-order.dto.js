"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = void 0;
class CreateOrderDto {
    userId;
    addressId;
    items;
    tax;
    discount;
    shipping;
    constructor(userId, addressId, items, tax, discount, shipping) {
        this.userId = userId;
        this.addressId = addressId;
        this.items = items;
        this.tax = tax;
        this.discount = discount;
        this.shipping = shipping;
    }
    static create(object) {
        const { userId, addressId, items, tax = 0, discount = 0, shipping = 0 } = object;
        if (!userId)
            return ['UserId property is required'];
        if (!addressId)
            return ['AddressId property is required'];
        if (!items || !Array.isArray(items) || items.length === 0) {
            return ['Items must be a non-empty array'];
        }
        for (const item of items) {
            if (!item.productVariantId)
                return ['Each item must have a productVariantId'];
            if (!item.quantity || typeof item.quantity !== 'number' || item.quantity < 1) {
                return ['Each item quantity must be a positive integer'];
            }
        }
        const parseNonNegative = (label, value) => {
            if (value === undefined || value === null)
                return [undefined, 0];
            const n = Number(value);
            if (Number.isNaN(n) || n < 0)
                return [`${label} must be a non-negative number`, undefined];
            return [undefined, n];
        };
        const [taxErr, taxNum] = parseNonNegative('Tax', tax);
        if (taxErr)
            return [taxErr];
        const [discErr, discNum] = parseNonNegative('Discount', discount);
        if (discErr)
            return [discErr];
        const [shipErr, shipNum] = parseNonNegative('Shipping', shipping);
        if (shipErr)
            return [shipErr];
        const sanitizedItems = items.map((item) => ({
            productVariantId: item.productVariantId,
            quantity: Math.floor(item.quantity),
        }));
        return [
            undefined,
            new CreateOrderDto(userId, addressId, sanitizedItems, taxNum, discNum, shipNum),
        ];
    }
}
exports.CreateOrderDto = CreateOrderDto;
//# sourceMappingURL=create-order.dto.js.map