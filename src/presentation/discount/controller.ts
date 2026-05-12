import { Request, Response } from 'express';

import { DiscountRepository } from '../../domain/repositories/discount.repository';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateDiscountDto } from '../../domain/dtos/discount/create-discount.dto';
import { UpdateDiscountDto } from '../../domain/dtos/discount/update-discount.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class DiscountController {
  constructor(
    private readonly discountRepository: DiscountRepository,
    private readonly logger: ILogger,
  ) {}

  getAll = (req: Request, res: Response): void => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.discountRepository
      .findAll(paginationDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getAll - ${err}`);
        handleError(err, res);
      });
  };

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.discountRepository
      .findById(String(id))
      .then((discount) => res.status(200).json(discount))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  create = (req: Request, res: Response): void => {
    const [error, createDiscountDto] = CreateDiscountDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.discountRepository
      .create(createDiscountDto!)
      .then((discount) => res.status(201).json(discount))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  update = (req: Request, res: Response): void => {
    const [error, updateDiscountDto] = UpdateDiscountDto.create({ ...req.body, id: String(req.params.id) });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.discountRepository
      .update(updateDiscountDto!)
      .then((discount) => res.status(200).json(discount))
      .catch((err) => {
        this.logger.error(`update - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.discountRepository
      .delete(String(id))
      .then((discount) => res.status(200).json(discount))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
