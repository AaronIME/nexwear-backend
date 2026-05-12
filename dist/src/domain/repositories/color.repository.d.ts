import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateColorDto } from '../dtos/color/create-color.dto';
import { UpdateColorDto } from '../dtos/color/update-color.dto';
import { ColorEntity } from '../entities/color.entity';
import { ColorPaginationResult } from '../datasources/color.datasource';
export declare abstract class ColorRepository {
    abstract create(dto: CreateColorDto): Promise<ColorEntity>;
    abstract findAll(dto: PaginationDto): Promise<ColorPaginationResult>;
    abstract findById(id: string): Promise<ColorEntity>;
    abstract update(dto: UpdateColorDto): Promise<ColorEntity>;
    abstract delete(id: string): Promise<ColorEntity>;
}
//# sourceMappingURL=color.repository.d.ts.map