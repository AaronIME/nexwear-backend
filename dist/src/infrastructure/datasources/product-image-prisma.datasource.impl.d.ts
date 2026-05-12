import { PrismaClient } from '../../../generated/prisma/client';
import { ProductImageDatasource } from '../../domain/datasources/product-image.datasource';
import { CreateProductImageDto } from '../../domain/dtos/product-image/create-product-image.dto';
import { UpdateProductImageDto } from '../../domain/dtos/product-image/update-product-image.dto';
import { ProductImageEntity } from '../../domain/entities/product-image.entity';
export declare class ProductImagePrismaDatasourceImpl implements ProductImageDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(dto: CreateProductImageDto): Promise<ProductImageEntity>;
    findById(id: string): Promise<ProductImageEntity>;
    findByProductId(productId: string): Promise<ProductImageEntity[]>;
    update(dto: UpdateProductImageDto): Promise<ProductImageEntity>;
    delete(id: string): Promise<ProductImageEntity>;
}
//# sourceMappingURL=product-image-prisma.datasource.impl.d.ts.map