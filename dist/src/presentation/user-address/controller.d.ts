import { Request, Response } from 'express';
import { UserAddressRepository } from '../../domain/repositories/user-address.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class UserAddressController {
    private readonly userAddressRepository;
    private readonly logger;
    constructor(userAddressRepository: UserAddressRepository, logger: ILogger);
    getById: (req: Request, res: Response) => void;
    getByUserId: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    setDefault: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map