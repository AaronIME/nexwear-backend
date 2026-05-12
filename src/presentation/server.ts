import express, { Application, Router } from 'express';
import compression from 'compression';
import fileUpload from "express-fileupload";
import path from "path";
import { envs } from '../config/adapters/env.adapter';
import cors from 'cors';



interface ServerOptions {
  port: number;
  routes: Router;
  public_path?: any;
}

export class Server {
  private readonly app: Application;
  private readonly port: number;
  private readonly routes: Router;
  private readonly public_path: any;

  constructor(options: ServerOptions) {
    const { port, routes, public_path = 'public' } = options;

    this.app = express();
    this.port = port;
    this.routes = routes;
    this.public_path = public_path;
  }

  private configureMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(express.static(this.public_path));

    this.app.use(cors({
      origin: (origin, callback) => {
        if (!origin || envs.CORS_ORIGINS.split(',').includes(origin)) {
          callback(null, origin);
        } else {
          callback(new Error(`${origin} not allowed by CORS`));
        }
      },
    }));

    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      }),
    );

    this.app.use(this.routes);

    this.app.get(/.*/, (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.public_path}/index.html`,
      );
      res.sendFile(indexPath);
    });
  }

  private configureRoutes(): void {
    this.app.use(this.routes);
  }

  async start(): Promise<void> {
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
