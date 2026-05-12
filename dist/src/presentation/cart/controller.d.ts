import { Request, Response } from 'express';
import { CartRepository } from '../../domain/repositories/cart.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class CartController {
    private readonly cartRepository;
    private readonly logger;
    constructor(cartRepository: CartRepository, logger: ILogger);
    create: (req: Request, res: Response) => void;
    getById: (req: Request, res: Response) => void;
    getByUserId: (req: Request, res: Response) => void;
    getItems: (req: Request, res: Response) => void;
    clear: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map