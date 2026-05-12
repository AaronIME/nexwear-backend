"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("../../../generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const env_adapter_1 = require("../../config/adapters/env.adapter");
const adapter = new adapter_pg_1.PrismaPg({ connectionString: env_adapter_1.envs.POSTGRES_URL });
exports.prisma = new client_1.PrismaClient({ adapter });
//# sourceMappingURL=postgres-database.js.map