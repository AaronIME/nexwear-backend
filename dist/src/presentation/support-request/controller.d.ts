import { Request, Response } from 'express';
import { SupportRequestRepository } from '../../domain/repositories/support-request.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class SupportRequestController {
    private readonly supportRequestRepository;
    private readonly logger;
    constructor(supportRequestRepository: SupportRequestRepository, logger: ILogger);
    getAll: (req: Request, res: Response) => void;
    getById: (req: Request, res: Response) => void;
    getByUserId: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    updateStatus: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map