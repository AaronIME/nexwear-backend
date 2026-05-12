import { Request, Response } from "express";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { LoginDto } from "../../domain/dtos/auth/login.dto";
import { RegisterDto } from "../../domain/dtos/auth/register.dto";
import { handleError } from "../../config/handle-error";
import { ILogger } from "../../domain/interfaces/logger.interface";

export class AuthController {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly logger: ILogger,
  ) {}

  register = (req: Request, res: Response): void => {
    const [error, registerDto] = RegisterDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.authRepository
      .register(registerDto!)
      .then((result) => res.status(201).json(result))
      .catch((err) => {
        this.logger.error(`register - ${err}`);
        handleError(err, res);
      });
  };

  login = (req: Request, res: Response): void => {
    const [error, loginDto] = LoginDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.authRepository
      .login(loginDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`login - ${err}`);
        handleError(err, res);
      });
  };

  checkAuth = (req: Request, res: Response): void => {
    const authorization = req.header("Authorization");

    if (!authorization) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    if (!authorization.startsWith("Bearer ")) {
      res.status(401).json({ error: "Invalid Bearer Token" });
      return;
    }

    const token = authorization.split(" ").at(1) || "";

    this.authRepository
      .checkAuth(token!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`checkAuth - ${err}`);
        handleError(err, res);
      });
  };
}
