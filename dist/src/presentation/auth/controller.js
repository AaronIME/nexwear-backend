"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const login_dto_1 = require("../../domain/dtos/auth/login.dto");
const register_dto_1 = require("../../domain/dtos/auth/register.dto");
const handle_error_1 = require("../../config/handle-error");
class AuthController {
    authRepository;
    logger;
    constructor(authRepository, logger) {
        this.authRepository = authRepository;
        this.logger = logger;
    }
    register = (req, res) => {
        const [error, registerDto] = register_dto_1.RegisterDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.authRepository
            .register(registerDto)
            .then((result) => res.status(201).json(result))
            .catch((err) => {
            this.logger.error(`register - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    login = (req, res) => {
        const [error, loginDto] = login_dto_1.LoginDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.authRepository
            .login(loginDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`login - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    checkAuth = (req, res) => {
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
            .checkAuth(token)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`checkAuth - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=controller.js.map