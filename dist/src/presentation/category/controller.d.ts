import { Request, Response } from 'express';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class CategoryController {
    private readonly categoryRepository;
    private readonly logger;
    constructor(categoryRepository: CategoryRepository, logger: ILogger);
    getAll: (req: Request, res: Response) => void;
    getById: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map