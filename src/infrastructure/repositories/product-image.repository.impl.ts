import { ProductImageDatasource } from '../../domain/datasources/product-image.datasource';
import { CreateProductImageDto } from '../../domain/dtos/product-image/create-product-image.dto';
import { UpdateProductImageDto } from '../../domain/dtos/product-image/update-product-image.dto';
import { ProductImageEntity } from '../../domain/entities/product-image.entity';
import { ProductImageRepository } from '../../domain/repositories/product-image.repository';

export class ProductImageRepositoryImpl implements ProductImageRepository {
  constructor(private readonly datasource: ProductImageDatasource) {}

  create(dto: CreateProductImageDto): Promise<ProductImageEntity> {
    return this.datasource.create(dto);
  }

  findById(id: string): Promise<ProductImageEntity> {
    return this.datasource.findById(id);
  }

  findByProductId(productId: string): Promise<ProductImageEntity[]> {
    return this.datasource.findByProductId(productId);
  }

  update(dto: UpdateProductImageDto): Promise<ProductImageEntity> {
    return this.datasource.update(dto);
  }

  delete(id: string): Promise<ProductImageEntity> {
    return this.datasource.delete(id);
  }
}
