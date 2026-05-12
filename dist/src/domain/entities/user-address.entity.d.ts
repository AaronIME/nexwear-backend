export declare class UserAddressEntity {
    readonly id: string;
    readonly userId: string;
    readonly street: string;
    readonly city: string;
    readonly state: string;
    readonly country: string;
    readonly postalCode: string;
    readonly isDefault: boolean;
    constructor(id: string, userId: string, street: string, city: string, state: string, country: string, postalCode: string, isDefault: boolean);
    static fromObject(object: {
        [key: string]: any;
    }): UserAddressEntity;
}
//# sourceMappingURL=user-address.entity.d.ts.map