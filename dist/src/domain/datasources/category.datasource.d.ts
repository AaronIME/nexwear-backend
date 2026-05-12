import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import { UpdateCategoryDto } from '../dtos/category/update-category.dto';
import { CategoryEntity } from '../entities/category.entity';
export interface CategoryPaginationResult {
    page: number;
    limit: number;
    total: number;
    pages: number;
    next?: string | undefined;
    prev?: string | undefined;
    categories: CategoryEntity[];
}
export declare abstract class CategoryDatasource {
    abstract create(dto: CreateCategoryDto): Promise<CategoryEntity>;
    abstract findAll(dto: PaginationDto): Promise<CategoryPaginationResult>;
    abstract findById(id: string): Promise<CategoryEntity>;
    abstract update(dto: UpdateCategoryDto): Promise<CategoryEntity>;
    abstract delete(id: string): Promise<CategoryEntity>;
}
//# sourceMappingURL=category.datasource.d.ts.map