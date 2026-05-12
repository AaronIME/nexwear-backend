import { Request, Response } from 'express';

import { CategoryRepository } from '../../domain/repositories/category.repository';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { UpdateCategoryDto } from '../../domain/dtos/category/update-category.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class CategoryController {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly logger: ILogger,
  ) {}

  getAll = (req: Request, res: Response): void => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.categoryRepository
      .findAll(paginationDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getAll - ${err}`);
        handleError(err, res);
      });
  };

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.categoryRepository
      .findById(String(id))
      .then((category) => res.status(200).json(category))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  create = (req: Request, res: Response): void => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.categoryRepository
      .create(createCategoryDto!)
      .then((category) => res.status(201).json(category))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  update = (req: Request, res: Response): void => {
    const [error, updateCategoryDto] = UpdateCategoryDto.create({ ...req.body, id: String(req.params.id) });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.categoryRepository
      .update(updateCategoryDto!)
      .then((category) => res.status(200).json(category))
      .catch((err) => {
        this.logger.error(`update - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.categoryRepository
      .delete(String(id))
      .then((category) => res.status(200).json(category))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
