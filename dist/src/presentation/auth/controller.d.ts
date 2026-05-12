import { Request, Response } from "express";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { ILogger } from "../../domain/interfaces/logger.interface";
export declare class AuthController {
    private readonly authRepository;
    private readonly logger;
    constructor(authRepository: AuthRepository, logger: ILogger);
    register: (req: Request, res: Response) => void;
    login: (req: Request, res: Response) => void;
    checkAuth: (req: Request, res: Response) => void;
}
//# sourceMappingURL=controller.d.ts.map