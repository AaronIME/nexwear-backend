import { ProductVariantImageDatasource } from '../../domain/datasources/product-variant-image.datasource';
import { CreateProductVariantImageDto } from '../../domain/dtos/product-variant-image/create-product-variant-image.dto';
import { UpdateProductVariantImageDto } from '../../domain/dtos/product-variant-image/update-product-variant-image.dto';
import { ProductVariantImageEntity } from '../../domain/entities/product-variant-image.entity';
import { ProductVariantImageRepository } from '../../domain/repositories/product-variant-image.repository';
export declare class ProductVariantImageRepositoryImpl implements ProductVariantImageRepository {
    private readonly datasource;
    constructor(datasource: ProductVariantImageDatasource);
    create(dto: CreateProductVariantImageDto): Promise<ProductVariantImageEntity>;
    findById(id: string): Promise<ProductVariantImageEntity>;
    findByProductVariantId(productVariantId: string): Promise<ProductVariantImageEntity[]>;
    update(dto: UpdateProductVariantImageDto): Promise<ProductVariantImageEntity>;
    delete(id: string): Promise<ProductVariantImageEntity>;
}
//# sourceMappingURL=product-variant-image.repository.impl.d.ts.map