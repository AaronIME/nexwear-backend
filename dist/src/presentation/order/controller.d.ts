import { Request, Response } from 'express';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class OrderController {
    private readonly orderRepository;
    private readonly logger;
    constructor(orderRepository: OrderRepository, logger: ILogger);
    getAll: (req: Request, res: Response) => void;
    getById: (req: Request, res: Response) => void;
    getByUserId: (req: Request, res: Response) => void;
    getItems: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    updateStatus: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map