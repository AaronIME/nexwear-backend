import { PrismaClient } from '../../../generated/prisma/client';
import { ProductVariantDatasource } from '../../domain/datasources/product-variant.datasource';
import { CreateProductVariantDto } from '../../domain/dtos/product-variant/create-product-variant.dto';
import { UpdateProductVariantDto } from '../../domain/dtos/product-variant/update-product-variant.dto';
import { ProductVariantEntity } from '../../domain/entities/product-variant.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';

export class ProductVariantPrismaDatasourceImpl implements ProductVariantDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateProductVariantDto): Promise<ProductVariantEntity> {
    const productExists = await this.prisma.product.findUnique({ where: { id: dto.productId } });
    if (!productExists) throw CustomError.notFound(`Product with id "${dto.productId}" not found`);

    const skuExists = await this.prisma.productVariant.findUnique({ where: { sku: dto.sku } });
    if (skuExists) throw CustomError.badRequest(`SKU "${dto.sku}" is already in use`);

    if (dto.colorId) {
      const colorExists = await this.prisma.color.findUnique({ where: { id: dto.colorId } });
      if (!colorExists) throw CustomError.notFound(`Color with id "${dto.colorId}" not found`);
    }

    if (dto.sizeId) {
      const sizeExists = await this.prisma.size.findUnique({ where: { id: dto.sizeId } });
      if (!sizeExists) throw CustomError.notFound(`Size with id "${dto.sizeId}" not found`);
    }

    const variant = await this.prisma.productVariant.create({
      data: {
        productId: dto.productId ?? null,
        sku: dto.sku ?? null,
        stock: dto.stock,
        colorId: dto.colorId ?? null,
        sizeId: dto.sizeId ?? null,
        price: dto.price ?? null,
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        ...(dto.isDeleted !== undefined && { isDeleted: dto.isDeleted }),
      },
    });

    return ProductVariantEntity.fromObject(variant);
  }

  async findById(id: string): Promise<ProductVariantEntity> {
    const variant = await this.prisma.productVariant.findUnique({ where: { id } });
    if (!variant) throw CustomError.notFound(`Product variant with id "${id}" not found`);

    return ProductVariantEntity.fromObject(variant);
  }

  async findByProductId(productId: string): Promise<ProductVariantEntity[]> {
    const variants = await this.prisma.productVariant.findMany({
      where: { productId },
      orderBy: { sku: 'asc' },
    });

    return variants.map(ProductVariantEntity.fromObject);
  }

  async update(dto: UpdateProductVariantDto): Promise<ProductVariantEntity> {
    await this.findById(dto.id);

    if (dto.sku) {
      const skuExists = await this.prisma.productVariant.findUnique({ where: { sku: dto.sku } });
      if (skuExists && skuExists.id !== dto.id) {
        throw CustomError.badRequest(`SKU "${dto.sku}" is already in use`);
      }
    }

    if (dto.colorId) {
      const colorExists = await this.prisma.color.findUnique({ where: { id: dto.colorId } });
      if (!colorExists) throw CustomError.notFound(`Color with id "${dto.colorId}" not found`);
    }

    if (dto.sizeId) {
      const sizeExists = await this.prisma.size.findUnique({ where: { id: dto.sizeId } });
      if (!sizeExists) throw CustomError.notFound(`Size with id "${dto.sizeId}" not found`);
    }

    const updated = await this.prisma.productVariant.update({
      where: { id: dto.id },
      data: {
        ...(dto.sku && { sku: dto.sku }),
        ...(dto.stock !== undefined && { stock: dto.stock }),
        ...(dto.colorId !== undefined && { colorId: dto.colorId ?? null }),
        ...(dto.sizeId !== undefined && { sizeId: dto.sizeId ?? null }),
        ...(dto.price !== undefined && { price: dto.price ?? null }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        ...(dto.isDeleted !== undefined && { isDeleted: dto.isDeleted }),
      },
    });

    return ProductVariantEntity.fromObject(updated);
  }

  async delete(id: string): Promise<ProductVariantEntity> {
    await this.findById(id);

    const deleted = await this.prisma.productVariant.delete({ where: { id } });

    return ProductVariantEntity.fromObject(deleted);
  }
}
