import { Request, Response } from 'express';
import { CartItemRepository } from '../../domain/repositories/cart-item.repository';
import { ILogger } from '../../domain/interfaces/logger.interface';
export declare class CartItemController {
    private readonly cartItemRepository;
    private readonly logger;
    constructor(cartItemRepository: CartItemRepository, logger: ILogger);
    addItem: (req: Request, res: Response) => void;
    getById: (req: Request, res: Response) => void;
    getByCartId: (req: Request, res: Response) => void;
    updateQuantity: (req: Request, res: Response) => void;
    removeItem: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map