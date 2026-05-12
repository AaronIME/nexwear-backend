"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const env_adapter_1 = require("../config/adapters/env.adapter");
const cors_1 = __importDefault(require("cors"));
class Server {
    app;
    port;
    routes;
    public_path;
    constructor(options) {
        const { port, routes, public_path = 'public' } = options;
        this.app = (0, express_1.default)();
        this.port = port;
        this.routes = routes;
        this.public_path = public_path;
    }
    configureMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.static(this.public_path));
        this.app.use((0, cors_1.default)({
            origin: (origin, callback) => {
                if (!origin || env_adapter_1.envs.CORS_ORIGINS.split(',').includes(origin)) {
                    callback(null, origin);
                }
                else {
                    callback(new Error(`${origin} not allowed by CORS`));
                }
            },
        }));
        this.app.use((0, express_fileupload_1.default)({
            limits: { fileSize: 50 * 1024 * 1024 },
        }));
        this.app.use(this.routes);
        this.app.get(/.*/, (req, res) => {
            const indexPath = path_1.default.join(__dirname + `../../../${this.public_path}/index.html`);
            res.sendFile(indexPath);
        });
    }
    configureRoutes() {
        this.app.use(this.routes);
    }
    async start() {
        this.configureMiddlewares();
        this.configureRoutes();
        return new Promise((resolve) => {
            this.app.listen(this.port, () => {
                console.log(`Server running on port ${this.port}`);
                resolve();
            });
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map