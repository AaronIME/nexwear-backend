import { Request, Response } from 'express';

import { CartRepository } from '../../domain/repositories/cart.repository';
import { CreateCartDto } from '../../domain/dtos/cart/create-cart.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class CartController {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly logger: ILogger,
  ) {}

  create = (req: Request, res: Response): void => {
    const [error, createCartDto] = CreateCartDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.cartRepository
      .create(createCartDto!)
      .then((cart) => res.status(201).json(cart))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.cartRepository
      .findById(String(id))
      .then((cart) => res.status(200).json(cart))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  getByUserId = (req: Request, res: Response): void => {
    const { userId } = req.params;

    this.cartRepository
      .findByUserId(String(userId))
      .then((cart) => res.status(200).json(cart))
      .catch((err) => {
        this.logger.error(`getByUserId - ${err}`);
        handleError(err, res);
      });
  };

  getItems = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.cartRepository
      .getItems(String(id))
      .then((items) => res.status(200).json(items))
      .catch((err) => {
        this.logger.error(`getItems - ${err}`);
        handleError(err, res);
      });
  };

  clear = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.cartRepository
      .clear(String(id))
      .then(() => res.status(204).send())
      .catch((err) => {
        this.logger.error(`clear - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.cartRepository
      .delete(String(id))
      .then((cart) => res.status(200).json(cart))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
