export declare class UpdateUserAddressDto {
    readonly id: string;
    readonly street?: string | undefined;
    readonly city?: string | undefined;
    readonly state?: string | undefined;
    readonly country?: string | undefined;
    readonly postalCode?: string | undefined;
    readonly isDefault?: boolean | undefined;
    constructor(id: string, street?: string | undefined, city?: string | undefined, state?: string | undefined, country?: string | undefined, postalCode?: string | undefined, isDefault?: boolean | undefined);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, UpdateUserAddressDto?];
}
//# sourceMappingURL=update-user-address.dto.d.ts.map