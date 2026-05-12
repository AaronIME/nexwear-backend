import { PrismaClient, Prisma, Gender } from "../../../generated/prisma/client";
import {
  ProductDatasource,
  ProductPaginationResult,
} from "../../domain/datasources/product.datasource";
import { PaginationDto } from "../../domain/dtos/pagination/pagination.dto";
import { CreateProductDto } from "../../domain/dtos/product/create-product.dto";
import { UpdateProductDto } from "../../domain/dtos/product/update-product.dto";
import { FilterProductDto } from "../../domain/dtos/product/filter-product.dto";
import { ProductEntity } from "../../domain/entities/product.entity";
import { CustomError } from "../../domain/entities/errors/custom.error";
import { ProductListEntity } from "../../domain/entities/product-list.entity";
import { ProductDetailEntity } from "../../domain/entities/product-detail.entity";
import { BrandEntity } from "../../domain/entities/brand.entity";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { DiscountEntity } from "../../domain/entities/discount.entity";
import { ColorEntity } from "../../domain/entities/color.entity";
import { SizeEntity } from "../../domain/entities/size.entity";
import { TagEntity } from "../../domain/entities/tag.entity";
import { MaterialEntity } from "../../domain/entities/material.entity";

export class ProductPrismaDatasourceImpl implements ProductDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    await this.validateRelations(dto);

    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        gender: dto.gender,
        brandId: dto.brandId ?? null,
        categoryId: dto.categoryId ?? null,
        discountId: dto.discountId ?? null,
        ...(dto.tagIds?.length && {
          tags: { create: dto.tagIds.map((tagId) => ({ tagId })) },
        }),
        ...(dto.materialIds?.length && {
          materials: {
            create: dto.materialIds.map((materialId) => ({ materialId })),
          },
        }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        ...(dto.isDeleted !== undefined && { isDeleted: dto.isDeleted }),
      },
    });

    return ProductEntity.fromObject(product);
  }

  async findAll(
    pagination: PaginationDto,
    filters?: FilterProductDto,
  ): Promise<ProductPaginationResult> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const {
      search,
      categoryId,
      brandId,
      colorId,
      sizeId,
      materialId,
      tagId,
      discountId,
      gender,
      minPrice,
      maxPrice,
      inStock,
      sortBy,
      isActive,
      isDeleted,
    } = filters ?? {};

    const [brand, category, discount, color, size, material, tag] = await Promise.all([
      brandId ? this.prisma.brand.findUnique({ where: { id: brandId } }) : undefined,
      categoryId ? this.prisma.category.findUnique({ where: { id: categoryId } }) : undefined,
      discountId ? this.prisma.discount.findUnique({ where: { id: discountId } }) : undefined,
      colorId ? this.prisma.color.findUnique({ where: { id: colorId } }) : undefined,
      sizeId ? this.prisma.size.findUnique({ where: { id: sizeId } }) : undefined,
      materialId ? this.prisma.material.findUnique({ where: { id: materialId } }) : undefined,
      tagId ? this.prisma.tag.findUnique({ where: { id: tagId } }) : undefined,
    ]);

    const isGenderValid = gender && Object.values(Gender).includes(gender);
    const isMinPriceValid = minPrice !== undefined && !isNaN(Number(minPrice)) && Number(minPrice) >= 0;
    const isMaxPriceValid = maxPrice !== undefined && !isNaN(Number(maxPrice)) && Number(maxPrice) >= 0;
    const isInStockValid = inStock !== undefined && (inStock === true || inStock === false);

    const isActiveValid = isActive !== undefined && (isActive === true || isActive === false);
    const isDeletedValid = isDeleted !== undefined && (isDeleted === true || isDeleted === false);

    
    const validFilters = {
      search: search ?? undefined,
      brandId: brand ? brandId : undefined,
      categoryId: category ? categoryId : undefined,
      discountId: discount ? discountId : undefined,
      colorId: color ? colorId : undefined,
      sizeId: size ? sizeId : undefined,
      materialId: material ? materialId : undefined,
      tagId: tag ? tagId : undefined,
      gender: isGenderValid ? gender : undefined,
      minPrice: isMinPriceValid ? minPrice : undefined,
      maxPrice: isMaxPriceValid ? maxPrice : undefined,
      inStock: isInStockValid ? inStock : undefined,
      sortBy: sortBy ?? undefined,
      isActive: isActiveValid ? isActive : undefined,
      isDeleted: isDeletedValid ? isDeleted : undefined,
    };

    
    const responseFilters = {
      search: search ?? undefined,
      brand: brand ? BrandEntity.fromObject(brand) : undefined,
      category: category ? CategoryEntity.fromObject(category) : undefined,
      discount: discount ? DiscountEntity.fromObject(discount) : undefined,
      color: color ? ColorEntity.fromObject(color) : undefined,
      size: size ? SizeEntity.fromObject(size) : undefined,
      material: material ? MaterialEntity.fromObject(material) : undefined,
      tag: tag ? TagEntity.fromObject(tag) : undefined,
      gender: isGenderValid ? gender : undefined,
      minPrice: isMinPriceValid ? minPrice : undefined,
      maxPrice: isMaxPriceValid ? maxPrice : undefined,
      inStock: isInStockValid ? inStock : undefined,
      sortBy: sortBy ?? undefined,
      isActive: isActiveValid ? isActive : undefined,
      isDeleted: isDeletedValid ? isDeleted : undefined,
    }

    
    
    const where = this.buildWhereClause(validFilters);
    
   

    const orderBy = this.buildOrderBy(sortBy);

    const [total, products, productFilters] = await Promise.all([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        include: {
          brand: true,
          category: true,
          discount: true,
          images: {
            orderBy: { order: "asc" },
            take: 1,
          },
        },
        skip,
        take: limit,
        orderBy,
      }),
      this.getAvailableFilters(where),
    ]);

    const pages = Math.ceil(total / limit);
    const query = this.buildQueryString(validFilters);

    return {
      page,
      limit,
      total,
      pages,
      next:
        page < pages
          ? `api/products?page=${page + 1}&limit=${limit}${query}`
          : undefined,
      prev:
        page > 1
          ? `api/products?page=${page - 1}&limit=${limit}${query}`
          : undefined,
      products: products.map(ProductListEntity.fromObject),
      productFilters,
      filters: filters
        ? responseFilters
        : undefined,
    };
  }

  async findRandom(count: number): Promise<ProductListEntity[]> {
    const take = Math.min(Math.max(1, Math.floor(count)), 20);

    const rows = await this.prisma.$queryRaw<Array<{ id: string }>>`
      SELECT id FROM products
      WHERE is_active = true AND is_deleted = false
      ORDER BY RANDOM()
      LIMIT ${take}
    `;

    if (rows.length === 0) {
      return [];
    }

    const ids = rows.map(({ id }) => id);
    const products = await this.prisma.product.findMany({
      where: { id: { in: ids } },
      include: {
        brand: true,
        category: true,
        discount: true,
        images: {
          orderBy: { order: "asc" },
          take: 1,
        },
      },
    });

    const rank = new Map(ids.map((id, index) => [id, index]));
    products.sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0));

    return products.map(ProductListEntity.fromObject);
  }

  async findById(id: string): Promise<ProductDetailEntity> {
    const product = await this.prisma.product.findUnique({ where: { id }, include: {
      brand: true,
      category: true,
      discount: true,
      images: true,
      variants: {
        include: {
          color: true,
          size: true,
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
      materials: {
        include: {
          material: true,
        },
      },
    } });


    if (!product)
      throw CustomError.notFound(`Product with id "${id}" not found`);

    return ProductDetailEntity.fromObject(product);
  }

  async update(dto: UpdateProductDto): Promise<ProductEntity> {
    await this.findById(dto.id);
    await this.validateRelations(dto);

    console.log({dto})

    const updated = await this.prisma.product.update({
      where: { id: dto.id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.description && { description: dto.description }),
        ...(dto.price !== undefined && { price: dto.price }),
        ...(dto.gender && { gender: dto.gender }),
        ...(dto.soldCount !== undefined && { soldCount: dto.soldCount }),
        ...(dto.brandId !== undefined && { brandId: dto.brandId ?? null }),
        ...(dto.categoryId !== undefined && {
          categoryId: dto.categoryId ?? null,
        }),
        ...(dto.discountId !== undefined && {
          discountId: dto.discountId ?? null,
        }),
        ...(dto.tagIds && {
          tags: {
            deleteMany: {},
            create: dto.tagIds.map((tagId) => ({ tagId })),
          },
        }),
        ...(dto.materialIds && {
          materials: {
            deleteMany: {},
            create: dto.materialIds.map((materialId) => ({ materialId })),
          },
        }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        ...(dto.isDeleted !== undefined && { isDeleted: dto.isDeleted }),
      },
    });

    return ProductEntity.fromObject(updated);
  }

  async delete(id: string): Promise<ProductEntity> {
    await this.findById(id);

    const deleted = await this.prisma.product.delete({ where: { id } });

    return ProductEntity.fromObject(deleted);
  }

  private buildWhereClause(
    filters?: FilterProductDto,
  ): Prisma.ProductWhereInput {
    if (!filters) return {};

    console.log({filters})
    const {
      search,
      categoryId,
      brandId,
      colorId,
      sizeId,
      materialId,
      tagId,
      discountId,
      gender,
      minPrice,
      maxPrice,
      inStock,
      isActive,
      isDeleted,
    } = filters;

    return {
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(categoryId && { categoryId }),
      ...(brandId && { brandId }),
      ...(discountId && { discountId }),
      ...(gender && { gender }),
      ...(isActive !== undefined && { isActive }),
      ...(isDeleted !== undefined && { isDeleted }),
      ...(minPrice !== undefined || maxPrice !== undefined
        ? {
            price: {
              ...(minPrice !== undefined && { gte: minPrice }),
              ...(maxPrice !== undefined && { lte: maxPrice }),
            },
          }
        : {}),
      ...(tagId && { tags: { some: { tagId } } }),
      ...(materialId && { materials: { some: { materialId } } }),
      ...((colorId || sizeId || inStock !== undefined) && {
        variants: {
          some: {
            ...(colorId && { colorId }),
            ...(sizeId && { sizeId }),
            ...(inStock === true && { stock: { gt: 0 } }),
            ...(inStock === false && { stock: 0 }),
          },
        },
      }),
    };
  }

  private buildQueryString(filters?: FilterProductDto): string {
    if (!filters) return "";

    const params: string[] = [];
    const {
      search,
      categoryId,
      brandId,
      colorId,
      sizeId,
      materialId,
      tagId,
      discountId,
      gender,
      minPrice,
      maxPrice,
      inStock,
      sortBy,
      isActive,
      isDeleted,
    } = filters;

    if (search) params.push(`search=${search}`);
    if (categoryId) params.push(`categoryId=${categoryId}`);
    if (brandId) params.push(`brandId=${brandId}`);
    if (colorId) params.push(`colorId=${colorId}`);
    if (sizeId) params.push(`sizeId=${sizeId}`);
    if (materialId) params.push(`materialId=${materialId}`);
    if (tagId) params.push(`tagId=${tagId}`);
    if (discountId) params.push(`discountId=${discountId}`);
    if (gender) params.push(`gender=${gender}`);
    if (minPrice !== undefined) params.push(`minPrice=${minPrice}`);
    if (maxPrice !== undefined) params.push(`maxPrice=${maxPrice}`);
    if (inStock !== undefined) params.push(`inStock=${inStock}`);
    if (sortBy) params.push(`sortBy=${sortBy}`);
    if (isActive !== undefined) params.push(`isActive=${isActive}`);
    if (isDeleted !== undefined) params.push(`isDeleted=${isDeleted}`);

    return params.length ? `&${params.join("&")}` : "";
  }

  private buildOrderBy(sortBy?: string): Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[] {
    switch (sortBy) {
      case 'price-asc':
        return { price: 'asc' };
      case 'price-desc':
        return { price: 'desc' };
      case 'rating':
        return [{ averageRating: 'desc' }, { reviewCount: 'desc' }];
      case 'best-selling':
        return [{ soldCount: 'desc' }, { averageRating: 'desc' }];
      case 'newest':
      default:
        return { createdAt: 'desc' };
    }
  }

  private async validateRelations(dto: {
    brandId?: string | undefined;
    categoryId?: string | undefined;
    discountId?: string | undefined;
    tagIds?: string[] | undefined;
    materialIds?: string[] | undefined;
  }): Promise<void> {
    if (dto.brandId) {
      const exists = await this.prisma.brand.findUnique({
        where: { id: dto.brandId },
      });
      if (!exists)
        throw CustomError.notFound(`Brand with id "${dto.brandId}" not found`);
    }

    if (dto.categoryId) {
      const exists = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      });
      if (!exists)
        throw CustomError.notFound(
          `Category with id "${dto.categoryId}" not found`,
        );
    }

    if (dto.discountId) {
      const exists = await this.prisma.discount.findUnique({
        where: { id: dto.discountId },
      });
      if (!exists)
        throw CustomError.notFound(
          `Discount with id "${dto.discountId}" not found`,
        );
    }

    if (dto.tagIds?.length) {
      const tags = await this.prisma.tag.findMany({
        where: { id: { in: dto.tagIds } },
      });
      if (tags.length !== dto.tagIds.length)
        throw CustomError.notFound("One or more tags were not found");
    }

    if (dto.materialIds?.length) {
      const materials = await this.prisma.material.findMany({
        where: { id: { in: dto.materialIds } },
      });
      if (materials.length !== dto.materialIds.length)
        throw CustomError.notFound("One or more materials were not found");
    }
  }

  private async getAvailableFilters(where: Prisma.ProductWhereInput) {
    const [brands, categories, discounts, colors, sizes, tags, materials, priceRange] = await Promise.all([
      this.prisma.brand.findMany({
        where: {
          products: { some: where },
        },
        distinct: ['id'],
      }),
      this.prisma.category.findMany({
        where: {
          products: { some: where },
        },
        distinct: ['id'],
      }),
      this.prisma.discount.findMany({
        where: {
          products: { some: where },
        },
        distinct: ['id'],
      }),
      this.prisma.color.findMany({
        where: {
          variants: {
            some: {
              product: where,
            },
          },
        },
        distinct: ['id'],
      }),
      this.prisma.size.findMany({
        where: {
          variants: {
            some: {
              product: where,
            },
          },
        },
        distinct: ['id'],
      }),
      this.prisma.tag.findMany({
        where: {
          products: {
            some: {
              product: where,
            },
          },
        },
        distinct: ['id'],
      }),
      this.prisma.material.findMany({
        where: {
          products: {
            some: {
              product: where,
            },
          },
        },
        distinct: ['id'],
      }),
      this.prisma.product.aggregate({
        where,
        _min: { price: true },
        _max: { price: true },
      }),
    ]);

    return {
      brands: brands.map(BrandEntity.fromObject),
      categories: categories.map(CategoryEntity.fromObject),
      discounts: discounts.map(DiscountEntity.fromObject),
      colors: colors.map(ColorEntity.fromObject),
      sizes: sizes.map(SizeEntity.fromObject),
      tags: tags.map(TagEntity.fromObject),
      materials: materials.map(MaterialEntity.fromObject),
      minPrice: priceRange._min.price ?? 0,
      maxPrice: priceRange._max.price ?? 0,
    };
  }
}
