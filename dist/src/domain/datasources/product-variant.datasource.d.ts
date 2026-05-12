import { CreateProductVariantDto } from '../dtos/product-variant/create-product-variant.dto';
import { UpdateProductVariantDto } from '../dtos/product-variant/update-product-variant.dto';
import { ProductVariantEntity } from '../entities/product-variant.entity';
export declare abstract class ProductVariantDatasource {
    abstract create(dto: CreateProductVariantDto): Promise<ProductVariantEntity>;
    abstract findById(id: string): Promise<ProductVariantEntity>;
    abstract findByProductId(productId: string): Promise<ProductVariantEntity[]>;
    abstract update(dto: UpdateProductVariantDto): Promise<ProductVariantEntity>;
    abstract delete(id: string): Promise<ProductVariantEntity>;
}
//# sourceMappingURL=product-variant.datasource.d.ts.map