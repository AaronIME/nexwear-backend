import { Request, Response } from 'express';

import { TagRepository } from '../../domain/repositories/tag.repository';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateTagDto } from '../../domain/dtos/tag/create-tag.dto';
import { UpdateTagDto } from '../../domain/dtos/tag/update-tag.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class TagController {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly logger: ILogger,
  ) {}

  getAll = (req: Request, res: Response): void => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.tagRepository
      .findAll(paginationDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getAll - ${err}`);
        handleError(err, res);
      });
  };

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.tagRepository
      .findById(String(id))
      .then((tag) => res.status(200).json(tag))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  create = (req: Request, res: Response): void => {
    const [error, createTagDto] = CreateTagDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.tagRepository
      .create(createTagDto!)
      .then((tag) => res.status(201).json(tag))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  update = (req: Request, res: Response): void => {
    const [error, updateTagDto] = UpdateTagDto.create({ ...req.body, id: String(req.params.id) });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.tagRepository
      .update(updateTagDto!)
      .then((tag) => res.status(200).json(tag))
      .catch((err) => {
        this.logger.error(`update - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.tagRepository
      .delete(String(id))
      .then((tag) => res.status(200).json(tag))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
