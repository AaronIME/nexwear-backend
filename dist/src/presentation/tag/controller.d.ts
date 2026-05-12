import { Request, Response } from 'express';
import { TagRepository } from '../../domain/repositories/tag.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class TagController {
    private readonly tagRepository;
    private readonly logger;
    constructor(tagRepository: TagRepository, logger: ILogger);
    getAll: (req: Request, res: Response) => void;
    getById: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map