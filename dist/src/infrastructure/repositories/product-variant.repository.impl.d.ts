import { ProductVariantDatasource } from '../../domain/datasources/product-variant.datasource';
import { CreateProductVariantDto } from '../../domain/dtos/product-variant/create-product-variant.dto';
import { UpdateProductVariantDto } from '../../domain/dtos/product-variant/update-product-variant.dto';
import { ProductVariantEntity } from '../../domain/entities/product-variant.entity';
import { ProductVariantRepository } from '../../domain/repositories/product-variant.repository';
export declare class ProductVariantRepositoryImpl implements ProductVariantRepository {
    private readonly datasource;
    constructor(datasource: ProductVariantDatasource);
    create(dto: CreateProductVariantDto): Promise<ProductVariantEntity>;
    findById(id: string): Promise<ProductVariantEntity>;
    findByProductId(productId: string): Promise<ProductVariantEntity[]>;
    update(dto: UpdateProductVariantDto): Promise<ProductVariantEntity>;
    delete(id: string): Promise<ProductVariantEntity>;
}
//# sourceMappingURL=product-variant.repository.impl.d.ts.map