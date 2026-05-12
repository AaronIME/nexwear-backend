import { ProductVariantImageDatasource } from '../../domain/datasources/product-variant-image.datasource';
import { CreateProductVariantImageDto } from '../../domain/dtos/product-variant-image/create-product-variant-image.dto';
import { UpdateProductVariantImageDto } from '../../domain/dtos/product-variant-image/update-product-variant-image.dto';
import { ProductVariantImageEntity } from '../../domain/entities/product-variant-image.entity';
import { ProductVariantImageRepository } from '../../domain/repositories/product-variant-image.repository';

export class ProductVariantImageRepositoryImpl implements ProductVariantImageRepository {
  constructor(private readonly datasource: ProductVariantImageDatasource) {}

  create(dto: CreateProductVariantImageDto): Promise<ProductVariantImageEntity> {
    return this.datasource.create(dto);
  }

  findById(id: string): Promise<ProductVariantImageEntity> {
    return this.datasource.findById(id);
  }

  findByProductVariantId(productVariantId: string): Promise<ProductVariantImageEntity[]> {
    return this.datasource.findByProductVariantId(productVariantId);
  }

  update(dto: UpdateProductVariantImageDto): Promise<ProductVariantImageEntity> {
    return this.datasource.update(dto);
  }

  delete(id: string): Promise<ProductVariantImageEntity> {
    return this.datasource.delete(id);
  }
}
