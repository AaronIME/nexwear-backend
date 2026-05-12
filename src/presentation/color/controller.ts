import { Request, Response } from 'express';

import { ColorRepository } from '../../domain/repositories/color.repository';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateColorDto } from '../../domain/dtos/color/create-color.dto';
import { UpdateColorDto } from '../../domain/dtos/color/update-color.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class ColorController {
  constructor(
    private readonly colorRepository: ColorRepository,
    private readonly logger: ILogger,
  ) {}

  getAll = (req: Request, res: Response): void => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.colorRepository
      .findAll(paginationDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getAll - ${err}`);
        handleError(err, res);
      });
  };

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.colorRepository
      .findById(String(id))
      .then((color) => res.status(200).json(color))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  create = (req: Request, res: Response): void => {
    const [error, createColorDto] = CreateColorDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.colorRepository
      .create(createColorDto!)
      .then((color) => res.status(201).json(color))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  update = (req: Request, res: Response): void => {
    const [error, updateColorDto] = UpdateColorDto.create({ ...req.body, id: String(req.params.id) });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.colorRepository
      .update(updateColorDto!)
      .then((color) => res.status(200).json(color))
      .catch((err) => {
        this.logger.error(`update - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.colorRepository
      .delete(String(id))
      .then((color) => res.status(200).json(color))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
