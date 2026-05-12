import { Request, Response } from 'express';

import { PaymentRepository } from '../../domain/repositories/payment.repository';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreatePaymentDto } from '../../domain/dtos/payment/create-payment.dto';
import { UpdatePaymentDto } from '../../domain/dtos/payment/update-payment.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class PaymentController {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly logger: ILogger,
  ) {}

  getAll = (req: Request, res: Response): void => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.paymentRepository
      .findAll(paginationDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        this.logger.error(`getAll - ${err}`);
        handleError(err, res);
      });
  };

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.paymentRepository
      .findById(String(id))
      .then((payment) => res.status(200).json(payment))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  getByOrderId = (req: Request, res: Response): void => {
    const { orderId } = req.params;

    this.paymentRepository
      .findByOrderId(String(orderId))
      .then((payments) => res.status(200).json(payments))
      .catch((err) => {
        this.logger.error(`getByOrderId - ${err}`);
        handleError(err, res);
      });
  };

  create = (req: Request, res: Response): void => {
    const [error, createPaymentDto] = CreatePaymentDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.paymentRepository
      .create(createPaymentDto!)
      .then((payment) => res.status(201).json(payment))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  update = (req: Request, res: Response): void => {
    const [error, updatePaymentDto] = UpdatePaymentDto.create({ ...req.body, id: String(req.params.id) });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.paymentRepository
      .update(updatePaymentDto!)
      .then((payment) => res.status(200).json(payment))
      .catch((err) => {
        this.logger.error(`update - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.paymentRepository
      .delete(String(id))
      .then((payment) => res.status(200).json(payment))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
