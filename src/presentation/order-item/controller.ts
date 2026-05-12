import { Request, Response } from 'express';

import { OrderItemRepository } from '../../domain/repositories/order-item.repository';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class OrderItemController {
  constructor(
    private readonly orderItemRepository: OrderItemRepository,
    private readonly logger: ILogger,
  ) {}

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.orderItemRepository
      .findById(String(id))
      .then((item) => res.status(200).json(item))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  getByOrderId = (req: Request, res: Response): void => {
    const { orderId } = req.params;

    this.orderItemRepository
      .findByOrderId(String(orderId))
      .then((items) => res.status(200).json(items))
      .catch((err) => {
        this.logger.error(`getByOrderId - ${err}`);
        handleError(err, res);
      });
  };
}
