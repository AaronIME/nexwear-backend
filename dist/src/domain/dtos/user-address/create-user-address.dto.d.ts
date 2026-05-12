export declare class CreateUserAddressDto {
    readonly userId: string;
    readonly street: string;
    readonly city: string;
    readonly state: string;
    readonly country: string;
    readonly postalCode: string;
    readonly isDefault: boolean;
    constructor(userId: string, street: string, city: string, state: string, country: string, postalCode: string, isDefault: boolean);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, CreateUserAddressDto?];
}
//# sourceMappingURL=create-user-address.dto.d.ts.map