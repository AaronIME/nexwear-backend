import { Request, Response } from 'express';
import { ProductVariantRepository } from '../../domain/repositories/product-variant.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class ProductVariantController {
    private readonly productVariantRepository;
    private readonly logger;
    constructor(productVariantRepository: ProductVariantRepository, logger: ILogger);
    getById: (req: Request, res: Response) => void;
    getByProductId: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map