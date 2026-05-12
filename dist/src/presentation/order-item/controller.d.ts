import { Request, Response } from 'express';
import { OrderItemRepository } from '../../domain/repositories/order-item.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class OrderItemController {
    private readonly orderItemRepository;
    private readonly logger;
    constructor(orderItemRepository: OrderItemRepository, logger: ILogger);
    getById: (req: Request, res: Response) => void;
    getByOrderId: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map