import { PrismaClient } from "../../../generated/prisma/client";
import { ProductDatasource, ProductPaginationResult } from "../../domain/datasources/product.datasource";
import { PaginationDto } from "../../domain/dtos/pagination/pagination.dto";
import { CreateProductDto } from "../../domain/dtos/product/create-product.dto";
import { UpdateProductDto } from "../../domain/dtos/product/update-product.dto";
import { FilterProductDto } from "../../domain/dtos/product/filter-product.dto";
import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductDetailEntity } from "../../domain/entities/product-detail.entity";
export declare class ProductPrismaDatasourceImpl implements ProductDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(dto: CreateProductDto): Promise<ProductEntity>;
    findAll(pagination: PaginationDto, filters?: FilterProductDto): Promise<ProductPaginationResult>;
    findById(id: string): Promise<ProductDetailEntity>;
    update(dto: UpdateProductDto): Promise<ProductEntity>;
    delete(id: string): Promise<ProductEntity>;
    private buildWhereClause;
    private buildQueryString;
    private buildOrderBy;
    private validateRelations;
    private getAvailableFilters;
}
//# sourceMappingURL=product-prisma.datasource.impl.d.ts.map