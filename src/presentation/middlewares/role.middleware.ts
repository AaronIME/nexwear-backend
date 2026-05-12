import { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../config/adapters/jwt.adapter';
import { Role } from '../../domain/types/role.type';
import { PrismaClient } from '../../../generated/prisma/client';



export class RoleMiddleware {

  constructor(private readonly prisma: PrismaClient) {}

  validateRole = (...allowedRoles: Role[]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { userId } = req.body;

      console.log({userId})

      if (!userId) {
        res.status(401).json({ error: 'Not userId provided' });
        return;
      }
      
      try {

        const user = await this.prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
          res.status(401).json({ error: 'User not found' });
          return;
        }

        if (!allowedRoles.includes(user.role as Role)) {
          res.status(403).json({ error: 'Insufficient permissions' });
          return;
        }

        req.body.role = user.role;
        next();
      } catch (error) {
        console.log({error})
        res.status(500).json({ error: 'Internal server error' });
      }
    };
  };
}
