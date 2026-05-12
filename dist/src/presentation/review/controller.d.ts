import { Request, Response } from 'express';
import { ReviewRepository } from '../../domain/repositories/review.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class ReviewController {
    private readonly reviewRepository;
    private readonly logger;
    constructor(reviewRepository: ReviewRepository, logger: ILogger);
    getAll: (req: Request, res: Response) => void;
    getById: (req: Request, res: Response) => void;
    getByProductId: (req: Request, res: Response) => void;
    getByUserId: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map