import { Request, Response } from 'express';

import { UserAddressRepository } from '../../domain/repositories/user-address.repository';
import { CreateUserAddressDto } from '../../domain/dtos/user-address/create-user-address.dto';
import { UpdateUserAddressDto } from '../../domain/dtos/user-address/update-user-address.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class UserAddressController {
  constructor(
    private readonly userAddressRepository: UserAddressRepository,
    private readonly logger: ILogger,
  ) {}

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.userAddressRepository
      .findById(String(id))
      .then((address) => res.status(200).json(address))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  getByUserId = (req: Request, res: Response): void => {
    const { userId } = req.params;

    this.userAddressRepository
      .findByUserId(String(userId))
      .then((addresses) => res.status(200).json(addresses))
      .catch((err) => {
        this.logger.error(`getByUserId - ${err}`);
        handleError(err, res);
      });
  };

  create = (req: Request, res: Response): void => {
    const [error, createUserAddressDto] = CreateUserAddressDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.userAddressRepository
      .create(createUserAddressDto!)
      .then((address) => res.status(201).json(address))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  setDefault = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ error: 'UserId property is required' });
      return;
    }

    this.userAddressRepository
      .setDefault(String(id), String(userId))
      .then((address) => res.status(200).json(address))
      .catch((err) => {
        this.logger.error(`setDefault - ${err}`);
        handleError(err, res);
      });
  };

  update = (req: Request, res: Response): void => {
    const [error, updateUserAddressDto] = UpdateUserAddressDto.create({ ...req.body, id: String(req.params.id) });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.userAddressRepository
      .update(updateUserAddressDto!)
      .then((address) => res.status(200).json(address))
      .catch((err) => {
        this.logger.error(`update - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.userAddressRepository
      .delete(String(id))
      .then((address) => res.status(200).json(address))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
