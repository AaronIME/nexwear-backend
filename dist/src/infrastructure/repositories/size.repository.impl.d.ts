import { SizeDatasource, SizePaginationResult } from '../../domain/datasources/size.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateSizeDto } from '../../domain/dtos/size/create-size.dto';
import { UpdateSizeDto } from '../../domain/dtos/size/update-size.dto';
import { SizeEntity } from '../../domain/entities/size.entity';
import { SizeRepository } from '../../domain/repositories/size.repository';
export declare class SizeRepositoryImpl implements SizeRepository {
    private readonly datasource;
    constructor(datasource: SizeDatasource);
    create(dto: CreateSizeDto): Promise<SizeEntity>;
    findAll(dto: PaginationDto): Promise<SizePaginationResult>;
    findById(id: string): Promise<SizeEntity>;
    update(dto: UpdateSizeDto): Promise<SizeEntity>;
    delete(id: string): Promise<SizeEntity>;
}
//# sourceMappingURL=size.repository.impl.d.ts.map