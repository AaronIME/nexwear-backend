import { Role } from '../../types/role.type';
export declare class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly role: Role;
    constructor(name: string, email: string, password: string, role: Role);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, CreateUserDto?];
}
//# sourceMappingURL=create-user.dto.d.ts.map