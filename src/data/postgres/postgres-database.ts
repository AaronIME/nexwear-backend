import { PrismaClient } from '../../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

import { envs } from '../../config/adapters/env.adapter';

const adapter = new PrismaPg({ connectionString: envs.POSTGRES_URL });

export const prisma = new PrismaClient({ adapter });
