import { Request, Response } from 'express';

import { OrderRepository } from '../../domain/repositories/order.repository';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateOrderDto } from '../../domain/dtos/order/create-order.dto';
import { UpdateOrderDto } from '../../domain/dtos/order/update-order.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class OrderController {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly logger: ILogger,
  ) {}

  getAll = (req: Request, res: Response): void => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.orderRepository
      .findAll(paginationDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getAll - ${err}`);
        handleError(err, res);
      });
  };

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.orderRepository
      .findById(String(id))
      .then((order) => res.status(200).json(order))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  getByUserId = (req: Request, res: Response): void => {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.orderRepository
      .findByUserId(String(userId), paginationDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getByUserId - ${err}`);
        handleError(err, res);
      });
  };

  getItems = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.orderRepository
      .getItems(String(id))
      .then((items) => res.status(200).json(items))
      .catch((err) => {
        this.logger.error(`getItems - ${err}`);
        handleError(err, res);
      });
  };

  create = (req: Request, res: Response): void => {
    const [error, createOrderDto] = CreateOrderDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.orderRepository
      .create(createOrderDto!)
      .then((order) => res.status(201).json(order))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  updateStatus = (req: Request, res: Response): void => {
    const [error, updateOrderDto] = UpdateOrderDto.create({ ...req.body, id: String(req.params.id) });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.orderRepository
      .updateStatus(updateOrderDto!)
      .then((order) => res.status(200).json(order))
      .catch((err) => {
        this.logger.error(`updateStatus - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.orderRepository
      .delete(String(id))
      .then((order) => res.status(200).json(order))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
