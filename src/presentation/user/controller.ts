import { Request, Response } from 'express';

import { UserRepository } from '../../domain/repositories/user.repository';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateUserDto } from '../../domain/dtos/user/create-user.dto';
import { UpdateUserDto } from '../../domain/dtos/user/update-user.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: ILogger,
  ) {}

  getAll = (req: Request, res: Response): void => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.userRepository
      .findAll(paginationDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getAll - ${err}`);
        handleError(err, res);
      });
  };

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.userRepository
      .findById(String(id))
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  getByEmail = (req: Request, res: Response): void => {
    const { email } = req.params;

    this.userRepository
      .findByEmail(String(email))
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        this.logger.error(`getByEmail - ${err}`);
        handleError(err, res);
      });
  };

  create = (req: Request, res: Response): void => {
    const [error, createUserDto] = CreateUserDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.userRepository
      .create(createUserDto!)
      .then((user) => res.status(201).json(user))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  update = (req: Request, res: Response): void => {
    const [error, updateUserDto] = UpdateUserDto.create({ ...req.body, id: String(req.params.id) });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.userRepository
      .update(updateUserDto!)
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        this.logger.error(`update - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.userRepository
      .delete(String(id))
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
