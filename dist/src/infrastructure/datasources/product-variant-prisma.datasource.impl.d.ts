import { PrismaClient } from '../../../generated/prisma/client';
import { ProductVariantDatasource } from '../../domain/datasources/product-variant.datasource';
import { CreateProductVariantDto } from '../../domain/dtos/product-variant/create-product-variant.dto';
import { UpdateProductVariantDto } from '../../domain/dtos/product-variant/update-product-variant.dto';
import { ProductVariantEntity } from '../../domain/entities/product-variant.entity';
export declare class ProductVariantPrismaDatasourceImpl implements ProductVariantDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(dto: CreateProductVariantDto): Promise<ProductVariantEntity>;
    findById(id: string): Promise<ProductVariantEntity>;
    findByProductId(productId: string): Promise<ProductVariantEntity[]>;
    update(dto: UpdateProductVariantDto): Promise<ProductVariantEntity>;
    delete(id: string): Promise<ProductVariantEntity>;
}
//# sourceMappingURL=product-variant-prisma.datasource.impl.d.ts.map