import { CreateProductImageDto } from '../dtos/product-image/create-product-image.dto';
import { UpdateProductImageDto } from '../dtos/product-image/update-product-image.dto';
import { ProductImageEntity } from '../entities/product-image.entity';

export abstract class ProductImageDatasource {
  abstract create(dto: CreateProductImageDto): Promise<ProductImageEntity>;
  abstract findById(id: string): Promise<ProductImageEntity>;
  abstract findByProductId(productId: string): Promise<ProductImageEntity[]>;
  abstract update(dto: UpdateProductImageDto): Promise<ProductImageEntity>;
  abstract delete(id: string): Promise<ProductImageEntity>;
}
