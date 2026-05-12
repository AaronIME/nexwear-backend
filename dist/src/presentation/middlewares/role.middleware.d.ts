import { Request, Response, NextFunction } from 'express';
import { Role } from '../../domain/types/role.type';
import { PrismaClient } from '../../../generated/prisma/client';
export declare class RoleMiddleware {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    validateRole: (...allowedRoles: Role[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=role.middleware.d.ts.map