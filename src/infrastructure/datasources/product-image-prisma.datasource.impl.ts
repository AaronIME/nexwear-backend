import { randomUUID } from 'node:crypto';

import { PrismaClient } from '../../../generated/prisma/client';
import { FirebaseAdapter } from '../../config/adapters/firebase.adapter';
import { ProductImageDatasource } from '../../domain/datasources/product-image.datasource';
import { CreateProductImageDto } from '../../domain/dtos/product-image/create-product-image.dto';
import { UpdateProductImageDto } from '../../domain/dtos/product-image/update-product-image.dto';
import { ProductImageEntity } from '../../domain/entities/product-image.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';
import { UploadedFile } from 'express-fileupload';
import path from 'path';

export class ProductImagePrismaDatasourceImpl implements ProductImageDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  private static isFirebaseStorageUrl(url: string): boolean {
    return url.startsWith('https://firebasestorage.googleapis.com');
  }

  private buildProductImageStoragePath(file: UploadedFile): string {
    const extension = path.extname(file.name);
    return `${randomUUID()}${extension}`;
  }

  private async tryDeleteFirebaseObject(url: string): Promise<void> {
    if (!ProductImagePrismaDatasourceImpl.isFirebaseStorageUrl(url)) return;
    try {
      await FirebaseAdapter.deleteImage(url);
    } catch {

    }
  }

  async create(dto: CreateProductImageDto): Promise<ProductImageEntity> {

    console.log({dto})

    const productExists = await this.prisma.product.findUnique({ where: { id: dto.productId } });
    if (!productExists) throw CustomError.notFound(`Product with id "${dto.productId}" not found`);

    let finalUrl: string;
    if (dto.file?.data && dto.file.name) {
      finalUrl = await FirebaseAdapter.uploadImage(
        dto.file.data,
        this.buildProductImageStoragePath(dto.file!),
      );
    } else if (dto.url) {
      finalUrl = dto.url;
    } else {
      throw CustomError.badRequest('Either url or image file is required');
    }

    const image = await this.prisma.productImage.create({
      data: {
        productId: dto.productId,
        url: finalUrl,
        order: dto.order,
      },
    });

    return ProductImageEntity.fromObject(image);
  }

  async findById(id: string): Promise<ProductImageEntity> {
    const image = await this.prisma.productImage.findUnique({ where: { id } });
    if (!image) throw CustomError.notFound(`Product image with id "${id}" not found`);

    return ProductImageEntity.fromObject(image);
  }

  async findByProductId(productId: string): Promise<ProductImageEntity[]> {
    const images = await this.prisma.productImage.findMany({
      where: { productId },
      orderBy: { order: 'asc' },
    });

    return images.map(ProductImageEntity.fromObject);
  }

  async update(dto: UpdateProductImageDto): Promise<ProductImageEntity> {
    const existing = await this.findById(dto.id);

    let urlToPersist: string | undefined;
    if (dto.file?.data && dto.file.name) {
      urlToPersist = await FirebaseAdapter.uploadImage(
        dto.file.data,
        this.buildProductImageStoragePath(dto.file!),
      );
    } else if (dto.url !== undefined) {
      urlToPersist = dto.url;
    }

    const updated = await this.prisma.productImage.update({
      where: { id: dto.id },
      data: {
        ...(urlToPersist !== undefined && { url: urlToPersist }),
        ...(dto.order !== undefined && { order: dto.order }),
      },
    });

    if (
      urlToPersist !== undefined &&
      existing.url !== urlToPersist &&
      ProductImagePrismaDatasourceImpl.isFirebaseStorageUrl(existing.url)
    ) {
      await this.tryDeleteFirebaseObject(existing.url);
    }

    return ProductImageEntity.fromObject(updated);
  }

  async delete(id: string): Promise<ProductImageEntity> {
    const existing = await this.findById(id);

    await this.tryDeleteFirebaseObject(existing.url);

    const deleted = await this.prisma.productImage.delete({ where: { id } });

    return ProductImageEntity.fromObject(deleted);
  }
}
