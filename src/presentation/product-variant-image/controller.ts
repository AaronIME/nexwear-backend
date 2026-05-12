import { Request, Response } from 'express';
import { ProductVariantImageRepository } from '../../domain/repositories/product-variant-image.repository';
import { CreateProductVariantImageDto } from '../../domain/dtos/product-variant-image/create-product-variant-image.dto';
import { UpdateProductVariantImageDto } from '../../domain/dtos/product-variant-image/update-product-variant-image.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class ProductVariantImageController {
  constructor(
    private readonly productVariantImageRepository: ProductVariantImageRepository,
    private readonly logger: ILogger,
  ) {}

  create = (req: Request, res: Response): void => {
    const [error, createDto] = CreateProductVariantImageDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.productVariantImageRepository
      .create(createDto!)
      .then((productVariantImage) => res.status(201).json(productVariantImage))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  findById = (req: Request, res: Response): void => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'Id parameter is required and must be a string' });
      return;
    }

    this.productVariantImageRepository
      .findById(id)
      .then((productVariantImage) => res.status(200).json(productVariantImage))
      .catch((err) => {
        this.logger.error(`findById - ${err}`);
        handleError(err, res);
      });
  };

  findByProductVariantId = (req: Request, res: Response): void => {
    const { productVariantId } = req.params;

    if (!productVariantId || typeof productVariantId !== 'string') {
      res.status(400).json({ error: 'ProductVariantId parameter is required and must be a string' });
      return;
    }

    this.productVariantImageRepository
      .findByProductVariantId(productVariantId)
      .then((images) => res.status(200).json(images))
      .catch((err) => {
        this.logger.error(`findByProductVariantId - ${err}`);
        handleError(err, res);
      });
  };

  update = (req: Request, res: Response): void => {
    const { id } = req.params;
    const [error, updateDto] = UpdateProductVariantImageDto.create({ ...req.body, id });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.productVariantImageRepository
      .update(updateDto!)
      .then((productVariantImage) => res.status(200).json(productVariantImage))
      .catch((err) => {
        this.logger.error(`update - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'Id parameter is required and must be a string' });
      return;
    }

    this.productVariantImageRepository
      .delete(id)
      .then((productVariantImage) => res.status(200).json(productVariantImage))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
