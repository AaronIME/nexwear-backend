import { Request, Response } from 'express';
import { ProductVariantImageRepository } from '../../domain/repositories/product-variant-image.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class ProductVariantImageController {
    private readonly productVariantImageRepository;
    private readonly logger;
    constructor(productVariantImageRepository: ProductVariantImageRepository, logger: ILogger);
    create: (req: Request, res: Response) => void;
    findById: (req: Request, res: Response) => void;
    findByProductVariantId: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map