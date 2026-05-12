import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateDiscountDto } from '../dtos/discount/create-discount.dto';
import { UpdateDiscountDto } from '../dtos/discount/update-discount.dto';
import { DiscountEntity } from '../entities/discount.entity';

export interface DiscountPaginationResult {
  page: number;
  limit: number;
  total: number;
  pages: number;
  next?: string | undefined;
  prev?: string | undefined;
  discounts: DiscountEntity[];
}

export abstract class DiscountDatasource {
  abstract create(dto: CreateDiscountDto): Promise<DiscountEntity>;
  abstract findAll(dto: PaginationDto): Promise<DiscountPaginationResult>;
  abstract findById(id: string): Promise<DiscountEntity>;
  abstract update(dto: UpdateDiscountDto): Promise<DiscountEntity>;
  abstract delete(id: string): Promise<DiscountEntity>;
}
