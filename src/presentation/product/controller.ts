import { Request, Response } from 'express';

import { ProductRepository } from '../../domain/repositories/product.repository';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { FilterProductDto } from '../../domain/dtos/product/filter-product.dto';
import { CreateProductDto } from '../../domain/dtos/product/create-product.dto';
import { UpdateProductDto } from '../../domain/dtos/product/update-product.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class ProductController {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly logger: ILogger,
  ) {}

  getAll = (req: Request, res: Response): void => {
    const { page = 1, limit = 10, ...filterParams } = req.query;

    const [paginationError, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (paginationError) {
      res.status(400).json({ error: paginationError });
      return;
    }

    const [filterError, filterDto] = FilterProductDto.create(filterParams);
    if (filterError) {
      res.status(400).json({ error: filterError });
      return;
    }

    this.productRepository
      .findAll(paginationDto!, filterDto)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getAll - ${err}`);
        handleError(err, res);
      });
  };

  getRandom = (req: Request, res: Response): void => {
    const rawLimit = req.query.limit;
    const parsed =
      rawLimit === undefined || rawLimit === ""
        ? 5
        : Number.parseInt(String(rawLimit), 10);
    const limit = Number.isFinite(parsed) ? parsed : NaN;

    if (!Number.isFinite(limit) || limit < 1 || limit > 20) {
      res.status(400).json({ error: 'limit must be a number between 1 and 20 (default 5)' });
      return;
    }

    this.productRepository
      .findRandom(limit)
      .then((products) => res.status(200).json({ products }))
      .catch((err) => {
        this.logger.error(`getRandom - ${err}`);
        handleError(err, res);
      });
  };

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.productRepository
      .findById(String(id))
      .then((product) => res.status(200).json(product))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  create = (req: Request, res: Response): void => {
    const [error, createProductDto] = CreateProductDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.productRepository
      .create(createProductDto!)
      .then((product) => res.status(201).json(product))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  update = (req: Request, res: Response): void => {
    const [error, updateProductDto] = UpdateProductDto.create({ ...req.body, id: String(req.params.id) });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.productRepository
      .update(updateProductDto!)
      .then((product) => res.status(200).json(product))
      .catch((err) => {
        this.logger.error(`update - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.productRepository
      .delete(String(id))
      .then((product) => res.status(200).json(product))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
