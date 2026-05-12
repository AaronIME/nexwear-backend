import { Request, Response } from 'express';
import { PaymentRepository } from '../../domain/repositories/payment.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class PaymentController {
    private readonly paymentRepository;
    private readonly logger;
    constructor(paymentRepository: PaymentRepository, logger: ILogger);
    getAll: (req: Request, res: Response) => void;
    getById: (req: Request, res: Response) => void;
    getByOrderId: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map