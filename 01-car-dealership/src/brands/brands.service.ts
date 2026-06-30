import {
  HttpStatus,
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { initialBrands } from './brands.data';
import { GeneralResponse } from 'src/shared/types';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  findAll(): GeneralResponse<Brand[]> {
    return {
      statusCode: HttpStatus.OK,
      error: null,
      message: 'All Brands',
      data: initialBrands,
    };
  }

  findOne(brandId: number): GeneralResponse<Brand> {
    const id = Number(brandId);

    if (isNaN(id)) {
      throw new BadRequestException(`Invalid brand id "${brandId}"`);
    }

    const brand = initialBrands.find((b) => b.id === id);

    if (!brand) {
      throw new NotFoundException(`Brand with id "${brandId}" not found`);
    }

    return {
      statusCode: HttpStatus.OK,
      error: null,
      message: 'Brand Found',
      data: brand,
    };
  }

  create(createBrandDto: CreateBrandDto): GeneralResponse<Brand> {
    const { name } = createBrandDto;

    const exists = initialBrands.some(
      (b) => b.name.toLowerCase() === name.toLowerCase(),
    );

    if (exists) {
      throw new ConflictException(`Brand with name "${name}" already exists`);
    }

    const newId =
      initialBrands.length > 0
        ? Math.max(...initialBrands.map((b) => b.id)) + 1
        : 1;

    const newBrand: Brand = {
      id: newId,
      name,
      createdAt: new Date(),
    };

    initialBrands.push(newBrand);

    return {
      statusCode: HttpStatus.CREATED,
      error: null,
      message: 'Brand created successfully',
      data: newBrand,
    };
  }

  update(
    brandId: number,
    updateBrandDto: UpdateBrandDto,
  ): GeneralResponse<Brand> {
    const id = Number(brandId);

    if (isNaN(id)) {
      throw new BadRequestException(`Invalid brand id "${brandId}"`);
    }

    const brandIndex = initialBrands.findIndex((b) => b.id === id);

    if (brandIndex === -1) {
      throw new NotFoundException(`Brand with id "${brandId}" not found`);
    }

    if (updateBrandDto.name) {
      const newName = updateBrandDto.name;

      const exists = initialBrands.some(
        (b) =>
          b.id !== id &&
          b.name.toLowerCase() === newName.toLowerCase(),
      );

      if (exists) {
        throw new ConflictException(
          `Brand with name "${newName}" already exists`,
        );
      }
    }

    initialBrands[brandIndex] = {
      ...initialBrands[brandIndex],
      ...updateBrandDto,
      updatedAt: new Date(),
    };

    return {
      statusCode: HttpStatus.OK,
      error: null,
      message: 'Brand updated successfully',
      data: initialBrands[brandIndex],
    };
  }

  remove(brandId: number): GeneralResponse<Brand> {
    const id = Number(brandId);

    if (isNaN(id)) {
      throw new BadRequestException(`Invalid brand id "${brandId}"`);
    }

    const brandIndex = initialBrands.findIndex((b) => b.id === id);

    if (brandIndex === -1) {
      throw new NotFoundException(`Brand with id "${brandId}" not found`);
    }

    const [deletedBrand] = initialBrands.splice(brandIndex, 1);

    return {
      statusCode: HttpStatus.OK,
      error: null,
      message: 'Brand deleted successfully',
      data: deletedBrand,
    };
  }
}
