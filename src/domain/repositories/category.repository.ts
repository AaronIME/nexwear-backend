import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import { UpdateCategoryDto } from '../dtos/category/update-category.dto';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryPaginationResult } from '../datasources/category.datasource';

export abstract class CategoryRepository {
  abstract create(dto: CreateCategoryDto): Promise<CategoryEntity>;
  abstract findAll(dto: PaginationDto): Promise<CategoryPaginationResult>;
  abstract findById(id: string): Promise<CategoryEntity>;
  abstract update(dto: UpdateCategoryDto): Promise<CategoryEntity>;
  abstract delete(id: string): Promise<CategoryEntity>;
}
