import { Router } from 'express';
interface ServerOptions {
    port: number;
    routes: Router;
    public_path?: any;
}
export declare class Server {
    private readonly app;
    private readonly port;
    private readonly routes;
    private readonly public_path;
    constructor(options: ServerOptions);
    private configureMiddlewares;
    private configureRoutes;
    start(): Promise<void>;
}
export {};
//# sourceMappingURL=server.d.ts.map