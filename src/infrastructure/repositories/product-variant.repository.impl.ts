import { ProductVariantDatasource } from '../../domain/datasources/product-variant.datasource';
import { CreateProductVariantDto } from '../../domain/dtos/product-variant/create-product-variant.dto';
import { UpdateProductVariantDto } from '../../domain/dtos/product-variant/update-product-variant.dto';
import { ProductVariantEntity } from '../../domain/entities/product-variant.entity';
import { ProductVariantRepository } from '../../domain/repositories/product-variant.repository';

export class ProductVariantRepositoryImpl implements ProductVariantRepository {
  constructor(private readonly datasource: ProductVariantDatasource) {}

  create(dto: CreateProductVariantDto): Promise<ProductVariantEntity> {
    return this.datasource.create(dto);
  }

  findById(id: string): Promise<ProductVariantEntity> {
    return this.datasource.findById(id);
  }

  findByProductId(productId: string): Promise<ProductVariantEntity[]> {
    return this.datasource.findByProductId(productId);
  }

  update(dto: UpdateProductVariantDto): Promise<ProductVariantEntity> {
    return this.datasource.update(dto);
  }

  delete(id: string): Promise<ProductVariantEntity> {
    return this.datasource.delete(id);
  }
}
