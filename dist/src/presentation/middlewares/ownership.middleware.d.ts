import { Request, Response, NextFunction } from 'express';
type GetResourceUserIdFn = (req: Request) => Promise<string | null | undefined>;
export declare class OwnershipMiddleware {
    static validateOwnership: (getResourceUserId: GetResourceUserIdFn) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export declare const getResourceUserId: {
    order: (req: Request) => Promise<string | null>;
    orderByUserId: (req: Request) => Promise<string | null>;
    userAddress: (req: Request) => Promise<string | null>;
    userAddressByUserId: (req: Request) => Promise<string | null>;
    supportRequest: (req: Request) => Promise<string | null>;
    supportRequestByUserId: (req: Request) => Promise<string | null>;
    cart: (req: Request) => Promise<string | null>;
    cartByUserId: (req: Request) => Promise<string | null>;
    cartItem: (req: Request) => Promise<string | null>;
    payment: (req: Request) => Promise<string | null>;
    paymentByOrderId: (req: Request) => Promise<string | null>;
    user: (req: Request) => Promise<string | null>;
    review: (req: Request) => Promise<string | null>;
};
export {};
//# sourceMappingURL=ownership.middleware.d.ts.map