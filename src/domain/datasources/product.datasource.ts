import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { UpdateProductDto } from '../dtos/product/update-product.dto';
import { FilterProductDto } from '../dtos/product/filter-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { ProductDetailEntity } from '../entities/product-detail.entity';
import { Gender } from '../types/gender.type';
import { ProductListEntity } from '../entities/product-list.entity';
import { ColorEntity } from '../entities/color.entity';
import { MaterialEntity } from '../entities/material.entity';
import { SizeEntity } from '../entities/size.entity';
import { TagEntity } from '../entities/tag.entity';
import { BrandEntity } from '../entities/brand.entity';
import { CategoryEntity } from '../entities/category.entity';
import { DiscountEntity } from '../entities/discount.entity';

export interface ProductPaginationResult {
  page: number;
  limit: number;
  total: number;
  pages: number;
  next?: string | undefined;
  prev?: string | undefined;
  products: ProductListEntity[];
  productFilters: {
    tags: TagEntity[];
    colors: ColorEntity[];
    sizes: SizeEntity[];
    materials: MaterialEntity[];
    maxPrice: number;
    minPrice: number;
    brands: BrandEntity[];
    categories: CategoryEntity[];
    discounts: DiscountEntity[];
  }
  filters?: {
    search?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | undefined;
    colorId?: string | undefined;
    sizeId?: string | undefined;
    materialId?: string | undefined;
    tagId?: string | undefined;
    discountId?: string | undefined;
    gender?: Gender | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    inStock?: boolean | undefined;
    isActive?: boolean | undefined;
    isDeleted?: boolean | undefined;
  } | undefined;
}

export abstract class ProductDatasource {
  abstract create(dto: CreateProductDto): Promise<ProductEntity>;
  abstract findAll(pagination: PaginationDto, filters?: FilterProductDto): Promise<ProductPaginationResult>;
  abstract findRandom(count: number): Promise<ProductListEntity[]>;
  abstract findById(id: string): Promise<ProductDetailEntity>;
  abstract update(dto: UpdateProductDto): Promise<ProductEntity>;
  abstract delete(id: string): Promise<ProductEntity>;
}
