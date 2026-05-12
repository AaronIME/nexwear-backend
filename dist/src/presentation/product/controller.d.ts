import { Request, Response } from 'express';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class ProductController {
    private readonly productRepository;
    private readonly logger;
    constructor(productRepository: ProductRepository, logger: ILogger);
    getAll: (req: Request, res: Response) => void;
    getById: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map