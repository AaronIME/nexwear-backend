import { CategoryDatasource, CategoryPaginationResult } from '../../domain/datasources/category.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { UpdateCategoryDto } from '../../domain/dtos/category/update-category.dto';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';
export declare class CategoryRepositoryImpl implements CategoryRepository {
    private readonly datasource;
    constructor(datasource: CategoryDatasource);
    create(dto: CreateCategoryDto): Promise<CategoryEntity>;
    findAll(dto: PaginationDto): Promise<CategoryPaginationResult>;
    findById(id: string): Promise<CategoryEntity>;
    update(dto: UpdateCategoryDto): Promise<CategoryEntity>;
    delete(id: string): Promise<CategoryEntity>;
}
//# sourceMappingURL=category.repository.impl.d.ts.map