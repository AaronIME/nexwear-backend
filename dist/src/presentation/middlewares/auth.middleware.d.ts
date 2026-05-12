import { Request, Response, NextFunction } from 'express';
export declare class AuthMiddleware {
    static validateJwt(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=auth.middleware.d.ts.map