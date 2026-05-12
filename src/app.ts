import { Router } from 'express';
import { Server } from './presentation/server';
import { AppRoutes } from './routes';

(() => {
  main();
})();

async function main() {
    const PORT = parseInt(process.env.PORT ?? '3000', 10);
    
    const server = new Server({
      port: PORT,
      routes: AppRoutes.routes,
    });
    
    server.start();
}
