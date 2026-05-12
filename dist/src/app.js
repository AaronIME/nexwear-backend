"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./presentation/server");
const routes_1 = require("./routes");
(() => {
    main();
})();
async function main() {
    const PORT = parseInt(process.env.PORT ?? '3000', 10);
    const server = new server_1.Server({
        port: PORT,
        routes: routes_1.AppRoutes.routes,
    });
    server.start();
}
//# sourceMappingURL=app.js.map