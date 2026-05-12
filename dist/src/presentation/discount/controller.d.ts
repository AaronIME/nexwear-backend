import { Request, Response } from 'express';
import { DiscountRepository } from '../../domain/repositories/discount.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class DiscountController {
    private readonly discountRepository;
    private readonly logger;
    constructor(discountRepository: DiscountRepository, logger: ILogger);
    getAll: (req: Request, res: Response) => void;
    getById: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map