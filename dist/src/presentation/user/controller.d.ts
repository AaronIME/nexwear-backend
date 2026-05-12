import { Request, Response } from 'express';
import { UserRepository } from '../../domain/repositories/user.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class UserController {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: UserRepository, logger: ILogger);
    getAll: (req: Request, res: Response) => void;
    getById: (req: Request, res: Response) => void;
    getByEmail: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map