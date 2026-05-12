import { Role } from '../types/role.type';
export declare class UserEntity {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly role: Role;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly isActive: boolean;
    readonly isDeleted: boolean;
    constructor(id: string, name: string, email: string, role: Role, createdAt: Date, updatedAt: Date, isActive: boolean, isDeleted: boolean);
    static fromObject(object: {
        [key: string]: any;
    }): UserEntity;
}
//# sourceMappingURL=user.entity.d.ts.map