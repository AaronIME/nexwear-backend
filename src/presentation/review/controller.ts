import { Request, Response } from 'express';

import { ReviewRepository } from '../../domain/repositories/review.repository';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateReviewDto } from '../../domain/dtos/review/create-review.dto';
import { UpdateReviewDto } from '../../domain/dtos/review/update-review.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class ReviewController {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly logger: ILogger,
  ) {}

  getAll = (req: Request, res: Response): void => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.reviewRepository
      .findAll(paginationDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getAll - ${err}`);
        handleError(err, res);
      });
  };

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.reviewRepository
      .findById(String(id))
      .then((review) => res.status(200).json(review))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  getByProductId = (req: Request, res: Response): void => {
    const { productId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.reviewRepository
      .findByProductId(String(productId), paginationDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getByProductId - ${err}`);
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

    this.reviewRepository
      .findByUserId(String(userId), paginationDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getByUserId - ${err}`);
        handleError(err, res);
      });
  };

  create = (req: Request, res: Response): void => {
    const [error, createReviewDto] = CreateReviewDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.reviewRepository
      .create(createReviewDto!)
      .then((review) => res.status(201).json(review))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  update = (req: Request, res: Response): void => {
    const [error, updateReviewDto] = UpdateReviewDto.create({ ...req.body, id: String(req.params.id) });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.reviewRepository
      .update(updateReviewDto!)
      .then((review) => res.status(200).json(review))
      .catch((err) => {
        this.logger.error(`update - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.reviewRepository
      .delete(String(id))
      .then((review) => res.status(200).json(review))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
