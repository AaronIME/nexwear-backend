import { Request, Response } from 'express';

import { MaterialRepository } from '../../domain/repositories/material.repository';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateMaterialDto } from '../../domain/dtos/material/create-material.dto';
import { UpdateMaterialDto } from '../../domain/dtos/material/update-material.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class MaterialController {
  constructor(
    private readonly materialRepository: MaterialRepository,
    private readonly logger: ILogger,
  ) {}

  getAll = (req: Request, res: Response): void => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.materialRepository
      .findAll(paginationDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getAll - ${err}`);
        handleError(err, res);
      });
  };

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.materialRepository
      .findById(String(id))
      .then((material) => res.status(200).json(material))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  create = (req: Request, res: Response): void => {
    const [error, createMaterialDto] = CreateMaterialDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.materialRepository
      .create(createMaterialDto!)
      .then((material) => res.status(201).json(material))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  update = (req: Request, res: Response): void => {
    const [error, updateMaterialDto] = UpdateMaterialDto.create({ ...req.body, id: String(req.params.id) });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.materialRepository
      .update(updateMaterialDto!)
      .then((material) => res.status(200).json(material))
      .catch((err) => {
        this.logger.error(`update - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.materialRepository
      .delete(String(id))
      .then((material) => res.status(200).json(material))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
