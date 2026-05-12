import { Request, Response } from 'express';
import { ProductImageRepository } from '../../domain/repositories/product-image.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class ProductImageController {
    private readonly productImageRepository;
    private readonly logger;
    constructor(productImageRepository: ProductImageRepository, logger: ILogger);
    getById: (req: Request, res: Response) => void;
    getByProductId: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map