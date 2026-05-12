import { ProductImageDatasource } from '../../domain/datasources/product-image.datasource';
import { CreateProductImageDto } from '../../domain/dtos/product-image/create-product-image.dto';
import { UpdateProductImageDto } from '../../domain/dtos/product-image/update-product-image.dto';
import { ProductImageEntity } from '../../domain/entities/product-image.entity';
import { ProductImageRepository } from '../../domain/repositories/product-image.repository';
export declare class ProductImageRepositoryImpl implements ProductImageRepository {
    private readonly datasource;
    constructor(datasource: ProductImageDatasource);
    create(dto: CreateProductImageDto): Promise<ProductImageEntity>;
    findById(id: string): Promise<ProductImageEntity>;
    findByProductId(productId: string): Promise<ProductImageEntity[]>;
    update(dto: UpdateProductImageDto): Promise<ProductImageEntity>;
    delete(id: string): Promise<ProductImageEntity>;
}
//# sourceMappingURL=product-image.repository.impl.d.ts.map