import { Request, Response } from 'express';
import { BrandRepository } from '../../domain/repositories/brand.repository';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateBrandDto } from '../../domain/dtos/brand/create-brand.dto';
import { UpdateBrandDto } from '../../domain/dtos/brand/update-brand.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class BrandController {
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly logger: ILogger,
  ) {}

  getAll = (req: Request, res: Response): void => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.brandRepository
      .findAll(paginationDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getAll - ${err}`);
        handleError(err, res);
      });
  };

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.brandRepository
      .findById(String(id))
      .then((brand) => res.status(200).json(brand))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  create = (req: Request, res: Response): void => {
    const [error, createBrandDto] = CreateBrandDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.brandRepository
      .create(createBrandDto!)
      .then((brand) => res.status(201).json(brand))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  update = (req: Request, res: Response): void => {
    const [error, updateBrandDto] = UpdateBrandDto.create({ ...req.body, id: String(req.params.id) });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.brandRepository
      .update(updateBrandDto!)
      .then((brand) => res.status(200).json(brand))
      .catch((err) => {
        this.logger.error(`update - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.brandRepository
      .delete(String(id))
      .then((brand) => res.status(200).json(brand))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
