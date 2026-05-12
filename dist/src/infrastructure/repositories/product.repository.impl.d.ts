import { ProductDatasource, ProductPaginationResult } from '../../domain/datasources/product.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateProductDto } from '../../domain/dtos/product/create-product.dto';
import { UpdateProductDto } from '../../domain/dtos/product/update-product.dto';
import { FilterProductDto } from '../../domain/dtos/product/filter-product.dto';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductDetailEntity } from '../../domain/entities/product-detail.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';
export declare class ProductRepositoryImpl implements ProductRepository {
    private readonly datasource;
    constructor(datasource: ProductDatasource);
    create(dto: CreateProductDto): Promise<ProductEntity>;
    findAll(pagination: PaginationDto, filters?: FilterProductDto): Promise<ProductPaginationResult>;
    findById(id: string): Promise<ProductDetailEntity>;
    update(dto: UpdateProductDto): Promise<ProductEntity>;
    delete(id: string): Promise<ProductEntity>;
}
//# sourceMappingURL=product.repository.impl.d.ts.map