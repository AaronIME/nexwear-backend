import { Request, Response } from 'express';
import { BrandRepository } from '../../domain/repositories/brand.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class BrandController {
    private readonly brandRepository;
    private readonly logger;
    constructor(brandRepository: BrandRepository, logger: ILogger);
    getAll: (req: Request, res: Response) => void;
    getById: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map