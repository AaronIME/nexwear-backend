import { ColorDatasource, ColorPaginationResult } from '../../domain/datasources/color.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateColorDto } from '../../domain/dtos/color/create-color.dto';
import { UpdateColorDto } from '../../domain/dtos/color/update-color.dto';
import { ColorEntity } from '../../domain/entities/color.entity';
import { ColorRepository } from '../../domain/repositories/color.repository';
export declare class ColorRepositoryImpl implements ColorRepository {
    private readonly datasource;
    constructor(datasource: ColorDatasource);
    create(dto: CreateColorDto): Promise<ColorEntity>;
    findAll(dto: PaginationDto): Promise<ColorPaginationResult>;
    findById(id: string): Promise<ColorEntity>;
    update(dto: UpdateColorDto): Promise<ColorEntity>;
    delete(id: string): Promise<ColorEntity>;
}
//# sourceMappingURL=color.repository.impl.d.ts.map