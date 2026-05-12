import { Request, Response } from 'express';

import { CartItemRepository } from '../../domain/repositories/cart-item.repository';
import { AddCartItemDto } from '../../domain/dtos/cart/add-cart-item.dto';
import { UpdateCartItemDto } from '../../domain/dtos/cart/update-cart-item.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class CartItemController {
  constructor(
    private readonly cartItemRepository: CartItemRepository,
    private readonly logger: ILogger,
  ) {}

  addItem = (req: Request, res: Response): void => {
    const [error, addCartItemDto] = AddCartItemDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.cartItemRepository
      .addItem(addCartItemDto!)
      .then((item) => res.status(201).json(item))
      .catch((err) => {
        this.logger.error(`addItem - ${err}`);
        handleError(err, res);
      });
  };

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.cartItemRepository
      .findById(String(id))
      .then((item) => res.status(200).json(item))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  getByCartId = (req: Request, res: Response): void => {
    const { cartId } = req.params;

    this.cartItemRepository
      .findByCartId(String(cartId))
      .then((items) => res.status(200).json(items))
      .catch((err) => {
        this.logger.error(`getByCartId - ${err}`);
        handleError(err, res);
      });
  };

  updateQuantity = (req: Request, res: Response): void => {
    const [error, updateCartItemDto] = UpdateCartItemDto.create({ ...req.body, id: String(req.params.id) });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.cartItemRepository
      .updateQuantity(updateCartItemDto!)
      .then((item) => res.status(200).json(item))
      .catch((err) => {
        this.logger.error(`updateQuantity - ${err}`);
        handleError(err, res);
      });
  };

  removeItem = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.cartItemRepository
      .removeItem(String(id))
      .then((item) => res.status(200).json(item))
      .catch((err) => {
        this.logger.error(`removeItem - ${err}`);
        handleError(err, res);
      });
  };
}
