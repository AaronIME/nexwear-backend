import { Role } from "../../types/role.type";
export declare class UpdateUserDto {
    readonly id: string;
    readonly name?: string | undefined;
    readonly email?: string | undefined;
    readonly password?: string | undefined;
    readonly role?: Role | undefined;
    constructor(id: string, name?: string | undefined, email?: string | undefined, password?: string | undefined, role?: Role | undefined);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, UpdateUserDto?];
}
//# sourceMappingURL=update-user.dto.d.ts.map