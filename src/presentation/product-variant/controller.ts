import { Request, Response } from 'express';

import { ProductVariantRepository } from '../../domain/repositories/product-variant.repository';
import { CreateProductVariantDto } from '../../domain/dtos/product-variant/create-product-variant.dto';
import { UpdateProductVariantDto } from '../../domain/dtos/product-variant/update-product-variant.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class ProductVariantController {
  constructor(
    private readonly productVariantRepository: ProductVariantRepository,
    private readonly logger: ILogger,
  ) {}

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.productVariantRepository
      .findById(String(id))
      .then((variant) => res.status(200).json(variant))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  getByProductId = (req: Request, res: Response): void => {
    const { productId } = req.params;

    this.productVariantRepository
      .findByProductId(String(productId))
      .then((variants) => res.status(200).json(variants))
      .catch((err) => {
        this.logger.error(`getByProductId - ${err}`);
        handleError(err, res);
      });
  };

  create = (req: Request, res: Response): void => {
    const [error, createProductVariantDto] = CreateProductVariantDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.productVariantRepository
      .create(createProductVariantDto!)
      .then((variant) => res.status(201).json(variant))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  update = (req: Request, res: Response): void => {
    const [error, updateProductVariantDto] = UpdateProductVariantDto.create({
      ...req.body,
      id: String(req.params.id),
    });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.productVariantRepository
      .update(updateProductVariantDto!)
      .then((variant) => res.status(200).json(variant))
      .catch((err) => {
        this.logger.error(`update - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.productVariantRepository
      .delete(String(id))
      .then((variant) => res.status(200).json(variant))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
