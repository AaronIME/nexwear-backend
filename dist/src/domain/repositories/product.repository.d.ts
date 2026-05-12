import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { UpdateProductDto } from '../dtos/product/update-product.dto';
import { FilterProductDto } from '../dtos/product/filter-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { ProductDetailEntity } from '../entities/product-detail.entity';
import { ProductPaginationResult } from '../datasources/product.datasource';
export declare abstract class ProductRepository {
    abstract create(dto: CreateProductDto): Promise<ProductEntity>;
    abstract findAll(pagination: PaginationDto, filters?: FilterProductDto): Promise<ProductPaginationResult>;
    abstract findById(id: string): Promise<ProductDetailEntity>;
    abstract update(dto: UpdateProductDto): Promise<ProductEntity>;
    abstract delete(id: string): Promise<ProductEntity>;
}
//# sourceMappingURL=product.repository.d.ts.map