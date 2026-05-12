import { MaterialDatasource, MaterialPaginationResult } from '../../domain/datasources/material.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateMaterialDto } from '../../domain/dtos/material/create-material.dto';
import { UpdateMaterialDto } from '../../domain/dtos/material/update-material.dto';
import { MaterialEntity } from '../../domain/entities/material.entity';
import { MaterialRepository } from '../../domain/repositories/material.repository';
export declare class MaterialRepositoryImpl implements MaterialRepository {
    private readonly datasource;
    constructor(datasource: MaterialDatasource);
    create(dto: CreateMaterialDto): Promise<MaterialEntity>;
    findAll(dto: PaginationDto): Promise<MaterialPaginationResult>;
    findById(id: string): Promise<MaterialEntity>;
    update(dto: UpdateMaterialDto): Promise<MaterialEntity>;
    delete(id: string): Promise<MaterialEntity>;
}
//# sourceMappingURL=material.repository.impl.d.ts.map