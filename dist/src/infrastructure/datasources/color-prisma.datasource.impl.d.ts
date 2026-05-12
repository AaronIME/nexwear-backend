import { PrismaClient } from '../../../generated/prisma/client';
import { ColorDatasource, ColorPaginationResult } from '../../domain/datasources/color.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateColorDto } from '../../domain/dtos/color/create-color.dto';
import { UpdateColorDto } from '../../domain/dtos/color/update-color.dto';
import { ColorEntity } from '../../domain/entities/color.entity';
export declare class ColorPrismaDatasourceImpl implements ColorDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(dto: CreateColorDto): Promise<ColorEntity>;
    findAll(dto: PaginationDto): Promise<ColorPaginationResult>;
    findById(id: string): Promise<ColorEntity>;
    update(dto: UpdateColorDto): Promise<ColorEntity>;
    delete(id: string): Promise<ColorEntity>;
}
//# sourceMappingURL=color-prisma.datasource.impl.d.ts.map