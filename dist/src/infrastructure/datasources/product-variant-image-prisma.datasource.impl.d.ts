import { PrismaClient } from '../../../generated/prisma/client';
import { ProductVariantImageDatasource } from '../../domain/datasources/product-variant-image.datasource';
import { CreateProductVariantImageDto } from '../../domain/dtos/product-variant-image/create-product-variant-image.dto';
import { UpdateProductVariantImageDto } from '../../domain/dtos/product-variant-image/update-product-variant-image.dto';
import { ProductVariantImageEntity } from '../../domain/entities/product-variant-image.entity';
export declare class ProductVariantImagePrismaDatasourceImpl implements ProductVariantImageDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(dto: CreateProductVariantImageDto): Promise<ProductVariantImageEntity>;
    findById(id: string): Promise<ProductVariantImageEntity>;
    findByProductVariantId(productVariantId: string): Promise<ProductVariantImageEntity[]>;
    update(dto: UpdateProductVariantImageDto): Promise<ProductVariantImageEntity>;
    delete(id: string): Promise<ProductVariantImageEntity>;
}
//# sourceMappingURL=product-variant-image-prisma.datasource.impl.d.ts.map