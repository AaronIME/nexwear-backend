import { Request, Response } from 'express';
import { MaterialRepository } from '../../domain/repositories/material.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class MaterialController {
    private readonly materialRepository;
    private readonly logger;
    constructor(materialRepository: MaterialRepository, logger: ILogger);
    getAll: (req: Request, res: Response) => void;
    getById: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map