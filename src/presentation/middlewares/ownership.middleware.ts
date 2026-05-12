import { Request, Response, NextFunction } from 'express';
import { Role } from '../../domain/types/role.type';
import { prisma } from '../../data/postgres/postgres-database';

type GetResourceUserIdFn = (req: Request) => Promise<string | null | undefined>;

export class OwnershipMiddleware {
  static validateOwnership = (getResourceUserId: GetResourceUserIdFn) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { userId, role } = req.body;

        if (!userId) {
          res.status(403).json({ error: 'Access denied' });
          return;
        }

        if (role === Role.ADMIN) {
          next();
          return;
        }

        const resourceUserId = await getResourceUserId(req);

        if (!resourceUserId) {
          res.status(403).json({ error: 'Access denied' });
          return;
        }

        if (userId !== resourceUserId) {
          res.status(403).json({ error: 'Access denied' });
          return;
        }

        next();
      } catch (error) {
        res.status(403).json({ error: 'Access denied' });
      }
    };
  };
}

export const getResourceUserId = {
  order: async (req: Request): Promise<string | null> => {
    const order = await prisma.order.findUnique({
      where: { id: String(req.params.id) },
      select: { userId: true }
    });
    return order?.userId || null;
  },

  orderByUserId: async (req: Request): Promise<string | null> => {
    return String(req.params.userId) || null;
  },

  userAddress: async (req: Request): Promise<string | null> => {
    const address = await prisma.userAddress.findUnique({
      where: { id: String(req.params.id) },
      select: { userId: true }
    });
    return address?.userId || null;
  },

  userAddressByUserId: async (req: Request): Promise<string | null> => {
    return String(req.params.userId) || null;
  },

  supportRequest: async (req: Request): Promise<string | null> => {
    const support = await prisma.supportRequest.findUnique({
      where: { id: String(req.params.id) },
      select: { userId: true }
    });
    return support?.userId || null;
  },

  supportRequestByUserId: async (req: Request): Promise<string | null> => {
    return String(req.params.userId) || null;
  },

  cart: async (req: Request): Promise<string | null> => {
    const cart = await prisma.cart.findUnique({
      where: { id: String(req.params.id) },
      select: { userId: true }
    });
    return cart?.userId || null;
  },

  cartByUserId: async (req: Request): Promise<string | null> => {
    return String(req.params.userId) || null;
  },

  cartItem: async (req: Request): Promise<string | null> => {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: String(req.params.id) },
      include: { cart: { select: { userId: true } } }
    });
    return cartItem?.cart?.userId || null;
  },

  payment: async (req: Request): Promise<string | null> => {
    const payment = await prisma.payment.findUnique({
      where: { id: String(req.params.id) },
      include: { order: { select: { userId: true } } }
    });
    return payment?.order?.userId || null;
  },

  paymentByOrderId: async (req: Request): Promise<string | null> => {
    const order = await prisma.order.findUnique({
      where: { id: String(req.params.orderId) },
      select: { userId: true }
    });
    return order?.userId || null;
  },

  user: async (req: Request): Promise<string | null> => {
    return String(req.params.id) || null;
  },

  review: async (req: Request): Promise<string | null> => {
    const review = await prisma.review.findUnique({
      where: { id: String(req.params.id) },
      select: { userId: true }
    });
    return review?.userId || null;
  }
};
