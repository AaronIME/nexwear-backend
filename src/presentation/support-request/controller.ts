import { Request, Response } from 'express';

import { SupportRequestRepository } from '../../domain/repositories/support-request.repository';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateSupportRequestDto } from '../../domain/dtos/support-request/create-support-request.dto';
import { UpdateSupportRequestDto } from '../../domain/dtos/support-request/update-support-request.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class SupportRequestController {
  constructor(
    private readonly supportRequestRepository: SupportRequestRepository,
    private readonly logger: ILogger,
  ) {}

  getAll = (req: Request, res: Response): void => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.supportRequestRepository
      .findAll(paginationDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getAll - ${err}`);
        handleError(err, res);
      });
  };

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.supportRequestRepository
      .findById(String(id))
      .then((request) => res.status(200).json(request))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  getByUserId = (req: Request, res: Response): void => {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.supportRequestRepository
      .findByUserId(String(userId), paginationDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getByUserId - ${err}`);
        handleError(err, res);
      });
  };

  create = (req: Request, res: Response): void => {
    const [error, createSupportRequestDto] = CreateSupportRequestDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.supportRequestRepository
      .create(createSupportRequestDto!)
      .then((request) => res.status(201).json(request))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  updateStatus = (req: Request, res: Response): void => {
    const [error, updateSupportRequestDto] = UpdateSupportRequestDto.create({
      ...req.body,
      id: String(req.params.id),
    });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.supportRequestRepository
      .updateStatus(updateSupportRequestDto!)
      .then((request) => res.status(200).json(request))
      .catch((err) => {
        this.logger.error(`updateStatus - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.supportRequestRepository
      .delete(String(id))
      .then((request) => res.status(200).json(request))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
