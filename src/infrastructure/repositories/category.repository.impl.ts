import { CategoryDatasource, CategoryPaginationResult } from '../../domain/datasources/category.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { UpdateCategoryDto } from '../../domain/dtos/category/update-category.dto';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly datasource: CategoryDatasource) {}

  create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.datasource.create(dto);
  }

  findAll(dto: PaginationDto): Promise<CategoryPaginationResult> {
    return this.datasource.findAll(dto);
  }

  findById(id: string): Promise<CategoryEntity> {
    return this.datasource.findById(id);
  }

  update(dto: UpdateCategoryDto): Promise<CategoryEntity> {
    return this.datasource.update(dto);
  }

  delete(id: string): Promise<CategoryEntity> {
    return this.datasource.delete(id);
  }
}
