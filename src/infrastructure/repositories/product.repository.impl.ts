import { ProductDatasource, ProductPaginationResult } from '../../domain/datasources/product.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateProductDto } from '../../domain/dtos/product/create-product.dto';
import { UpdateProductDto } from '../../domain/dtos/product/update-product.dto';
import { FilterProductDto } from '../../domain/dtos/product/filter-product.dto';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductDetailEntity } from '../../domain/entities/product-detail.entity';
import { ProductListEntity } from '../../domain/entities/product-list.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly datasource: ProductDatasource) {}

  create(dto: CreateProductDto): Promise<ProductEntity> {
    return this.datasource.create(dto);
  }

  findAll(pagination: PaginationDto, filters?: FilterProductDto): Promise<ProductPaginationResult> {
    return this.datasource.findAll(pagination, filters);
  }

  findRandom(count: number): Promise<ProductListEntity[]> {
    return this.datasource.findRandom(count);
  }

  findById(id: string): Promise<ProductDetailEntity> {
    return this.datasource.findById(id);
  }

  update(dto: UpdateProductDto): Promise<ProductEntity> {
    return this.datasource.update(dto);
  }

  delete(id: string): Promise<ProductEntity> {
    return this.datasource.delete(id);
  }
}
