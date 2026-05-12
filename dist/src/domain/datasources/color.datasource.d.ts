import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateColorDto } from '../dtos/color/create-color.dto';
import { UpdateColorDto } from '../dtos/color/update-color.dto';
import { ColorEntity } from '../entities/color.entity';
export interface ColorPaginationResult {
    page: number;
    limit: number;
    total: number;
    pages: number;
    next?: string | undefined;
    prev?: string | undefined;
    colors: ColorEntity[];
}
export declare abstract class ColorDatasource {
    abstract create(dto: CreateColorDto): Promise<ColorEntity>;
    abstract findAll(dto: PaginationDto): Promise<ColorPaginationResult>;
    abstract findById(id: string): Promise<ColorEntity>;
    abstract update(dto: UpdateColorDto): Promise<ColorEntity>;
    abstract delete(id: string): Promise<ColorEntity>;
}
//# sourceMappingURL=color.datasource.d.ts.map