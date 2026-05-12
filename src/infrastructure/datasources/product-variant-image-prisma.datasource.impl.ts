import { PrismaClient } from '../../../generated/prisma/client';
import { ProductVariantImageDatasource } from '../../domain/datasources/product-variant-image.datasource';
import { CreateProductVariantImageDto } from '../../domain/dtos/product-variant-image/create-product-variant-image.dto';
import { UpdateProductVariantImageDto } from '../../domain/dtos/product-variant-image/update-product-variant-image.dto';
import { ProductVariantImageEntity } from '../../domain/entities/product-variant-image.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';

export class ProductVariantImagePrismaDatasourceImpl implements ProductVariantImageDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateProductVariantImageDto): Promise<ProductVariantImageEntity> {
    const variantExists = await this.prisma.productVariant.findUnique({
      where: { id: dto.productVariantId },
    });

    if (!variantExists) {
      throw CustomError.notFound(`ProductVariant with id "${dto.productVariantId}" not found`);
    }

    const productVariantImage = await this.prisma.productVariantImage.create({
      data: {
        productVariantId: dto.productVariantId,
        url: dto.url,
        order: dto.order,
      },
    });

    return ProductVariantImageEntity.fromObject(productVariantImage);
  }

  async findById(id: string): Promise<ProductVariantImageEntity> {
    const productVariantImage = await this.prisma.productVariantImage.findUnique({ where: { id } });
    if (!productVariantImage) {
      throw CustomError.notFound(`ProductVariantImage with id "${id}" not found`);
    }

    return ProductVariantImageEntity.fromObject(productVariantImage);
  }

  async findByProductVariantId(productVariantId: string): Promise<ProductVariantImageEntity[]> {
    const images = await this.prisma.productVariantImage.findMany({
      where: { productVariantId },
      orderBy: { order: 'asc' },
    });

    return images.map(ProductVariantImageEntity.fromObject);
  }

  async update(dto: UpdateProductVariantImageDto): Promise<ProductVariantImageEntity> {
    await this.findById(dto.id);

    const updated = await this.prisma.productVariantImage.update({
      where: { id: dto.id },
      data: {
        ...(dto.url && { url: dto.url }),
        ...(dto.order !== undefined && { order: dto.order }),
      },
    });

    return ProductVariantImageEntity.fromObject(updated);
  }

  async delete(id: string): Promise<ProductVariantImageEntity> {
    await this.findById(id);

    const deleted = await this.prisma.productVariantImage.delete({ where: { id } });

    return ProductVariantImageEntity.fromObject(deleted);
  }
}
