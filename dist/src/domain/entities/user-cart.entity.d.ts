import { CartItemEntity } from './cart-item.entity';
export declare class UserCartEntity {
    readonly id: string;
    readonly userId: string;
    readonly items: CartItemEntity[];
    constructor(id: string, userId: string, items: CartItemEntity[]);
    static fromObject(object: {
        [key: string]: any;
    }): UserCartEntity;
}
//# sourceMappingURL=user-cart.entity.d.ts.map