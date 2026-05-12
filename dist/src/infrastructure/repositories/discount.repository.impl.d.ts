import { DiscountDatasource, DiscountPaginationResult } from '../../domain/datasources/discount.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateDiscountDto } from '../../domain/dtos/discount/create-discount.dto';
import { UpdateDiscountDto } from '../../domain/dtos/discount/update-discount.dto';
import { DiscountEntity } from '../../domain/entities/discount.entity';
import { DiscountRepository } from '../../domain/repositories/discount.repository';
export declare class DiscountRepositoryImpl implements DiscountRepository {
    private readonly datasource;
    constructor(datasource: DiscountDatasource);
    create(dto: CreateDiscountDto): Promise<DiscountEntity>;
    findAll(dto: PaginationDto): Promise<DiscountPaginationResult>;
    findById(id: string): Promise<DiscountEntity>;
    update(dto: UpdateDiscountDto): Promise<DiscountEntity>;
    delete(id: string): Promise<DiscountEntity>;
}
//# sourceMappingURL=discount.repository.impl.d.ts.map