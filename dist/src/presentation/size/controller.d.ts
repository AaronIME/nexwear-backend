import { Request, Response } from 'express';
import { SizeRepository } from '../../domain/repositories/size.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class SizeController {
    private readonly sizeRepository;
    private readonly logger;
    constructor(sizeRepository: SizeRepository, logger: ILogger);
    getAll: (req: Request, res: Response) => void;
    getById: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map