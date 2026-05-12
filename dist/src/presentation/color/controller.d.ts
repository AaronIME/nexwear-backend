import { Request, Response } from 'express';
import { ColorRepository } from '../../domain/repositories/color.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class ColorController {
    private readonly colorRepository;
    private readonly logger;
    constructor(colorRepository: ColorRepository, logger: ILogger);
    getAll: (req: Request, res: Response) => void;
    getById: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map