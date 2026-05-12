import { ColorDatasource, ColorPaginationResult } from '../../domain/datasources/color.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateColorDto } from '../../domain/dtos/color/create-color.dto';
import { UpdateColorDto } from '../../domain/dtos/color/update-color.dto';
import { ColorEntity } from '../../domain/entities/color.entity';
import { ColorRepository } from '../../domain/repositories/color.repository';

export class ColorRepositoryImpl implements ColorRepository {
  constructor(private readonly datasource: ColorDatasource) {}

  create(dto: CreateColorDto): Promise<ColorEntity> {
    return this.datasource.create(dto);
  }

  findAll(dto: PaginationDto): Promise<ColorPaginationResult> {
    return this.datasource.findAll(dto);
  }

  findById(id: string): Promise<ColorEntity> {
    return this.datasource.findById(id);
  }

  update(dto: UpdateColorDto): Promise<ColorEntity> {
    return this.datasource.update(dto);
  }

  delete(id: string): Promise<ColorEntity> {
    return this.datasource.delete(id);
  }
}
