import { Request, Response } from 'express';

import { SizeRepository } from '../../domain/repositories/size.repository';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateSizeDto } from '../../domain/dtos/size/create-size.dto';
import { UpdateSizeDto } from '../../domain/dtos/size/update-size.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class SizeController {
  constructor(
    private readonly sizeRepository: SizeRepository,
    private readonly logger: ILogger,
  ) {}

  getAll = (req: Request, res: Response): void => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.sizeRepository
      .findAll(paginationDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getAll - ${err}`);
        handleError(err, res);
      });
  };

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.sizeRepository
      .findById(String(id))
      .then((size) => res.status(200).json(size))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  create = (req: Request, res: Response): void => {
    const [error, createSizeDto] = CreateSizeDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.sizeRepository
      .create(createSizeDto!)
      .then((size) => res.status(201).json(size))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  update = (req: Request, res: Response): void => {
    const [error, updateSizeDto] = UpdateSizeDto.create({ ...req.body, id: String(req.params.id) });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.sizeRepository
      .update(updateSizeDto!)
      .then((size) => res.status(200).json(size))
      .catch((err) => {
        this.logger.error(`update - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.sizeRepository
      .delete(String(id))
      .then((size) => res.status(200).json(size))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
