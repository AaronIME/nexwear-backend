import { CreateProductVariantImageDto } from '../dtos/product-variant-image/create-product-variant-image.dto';
import { UpdateProductVariantImageDto } from '../dtos/product-variant-image/update-product-variant-image.dto';
import { ProductVariantImageEntity } from '../entities/product-variant-image.entity';
export declare abstract class ProductVariantImageDatasource {
    abstract create(dto: CreateProductVariantImageDto): Promise<ProductVariantImageEntity>;
    abstract findById(id: string): Promise<ProductVariantImageEntity>;
    abstract findByProductVariantId(productVariantId: string): Promise<ProductVariantImageEntity[]>;
    abstract update(dto: UpdateProductVariantImageDto): Promise<ProductVariantImageEntity>;
    abstract delete(id: string): Promise<ProductVariantImageEntity>;
}
//# sourceMappingURL=product-variant-image.datasource.d.ts.map