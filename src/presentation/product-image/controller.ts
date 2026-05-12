import { Request, Response } from 'express';

import { UploadedFile } from 'express-fileupload';

import { ProductImageRepository } from '../../domain/repositories/product-image.repository';
import { CreateProductImageDto } from '../../domain/dtos/product-image/create-product-image.dto';
import { UpdateProductImageDto } from '../../domain/dtos/product-image/update-product-image.dto';
import { handleError } from '../../config/handle-error';
import { ILogger } from '../../domain/interfaces/logger.interface';

export class ProductImageController {
  constructor(
    private readonly productImageRepository: ProductImageRepository,
    private readonly logger: ILogger,
  ) {}

  private static getUploadedImage(req: Request): UploadedFile | undefined {
    const raw = req.files?.uploadedFile;
    const file: UploadedFile | undefined = Array.isArray(raw) ? raw[0] : raw;
    if (!file?.data) return undefined;
    return file;
  }

  getById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.productImageRepository
      .findById(String(id))
      .then((image) => res.status(200).json(image))
      .catch((err) => {
        this.logger.error(`getById - ${err}`);
        handleError(err, res);
      });
  };

  getByProductId = (req: Request, res: Response): void => {
    const { productId } = req.params;

    this.productImageRepository
      .findByProductId(String(productId))
      .then((images) => res.status(200).json(images))
      .catch((err) => {
        this.logger.error(`getByProductId - ${err}`);
        handleError(err, res);
      });
  };

  create = (req: Request, res: Response): void => {
    
    const uploaded = ProductImageController.getUploadedImage(req);
    const [error, createProductImageDto] = CreateProductImageDto.create({
      ...req.body,
      ...(uploaded && { file: uploaded }),
    });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.productImageRepository
      .create(createProductImageDto!)
      .then((image) => res.status(201).json(image))
      .catch((err) => {
        this.logger.error(`create - ${err}`);
        handleError(err, res);
      });
  };

  update = (req: Request, res: Response): void => {
    const uploaded = ProductImageController.getUploadedImage(req);
    const [error, updateProductImageDto] = UpdateProductImageDto.create({
      ...req.body,
      id: String(req.params.id),
      ...(uploaded && { file: uploaded }),
    });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.productImageRepository
      .update(updateProductImageDto!)
      .then((image) => res.status(200).json(image))
      .catch((err) => {
        this.logger.error(`update - ${err}`);
        handleError(err, res);
      });
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.productImageRepository
      .delete(String(id))
      .then((image) => res.status(200).json(image))
      .catch((err) => {
        this.logger.error(`delete - ${err}`);
        handleError(err, res);
      });
  };
}
