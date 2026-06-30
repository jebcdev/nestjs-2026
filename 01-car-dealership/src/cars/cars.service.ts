import {
  HttpStatus,
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { type GeneralResponse } from 'src/shared/types/';
import { type Car, cars } from './cars.data';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  getAllCars(): GeneralResponse<Car[]> {
    return {
      statusCode: HttpStatus.OK,
      error: null,
      message: 'All Cars',
      data: cars,
    };
  }

  getCarById(carId: number): GeneralResponse<Car> {
    const id = Number(carId);

    if (isNaN(id)) {
      throw new NotFoundException(`Car with id "${carId}" not found`);
    }

    const car = cars.find((c) => c.id === id);

    if (!car) {
      throw new NotFoundException(`Car with id "${carId}" not found`);
    }

    return {
      statusCode: HttpStatus.OK,
      error: null,
      message: 'Car Found',
      data: car,
    };
  }

  createCar(createCarDto: CreateCarDto): GeneralResponse<Car> {
    const { brand, model } = createCarDto;

    const exists = cars.some(
      (c) =>
        c.brand.toLowerCase() === brand.toLowerCase() &&
        c.model.toLowerCase() === model.toLowerCase(),
    );

    if (exists) {
      throw new ConflictException(
        `Car with brand "${brand}" and model "${model}" already exists`,
      );
    }

    const newId = cars.length > 0 ? Math.max(...cars.map((c) => c.id)) + 1 : 1;

    const newCar: Car = {
      id: newId,
      brand,
      model,
    };

    cars.push(newCar);

    return {
      statusCode: HttpStatus.CREATED,
      error: null,
      message: 'Car created successfully',
      data: newCar,
    };
  }

  updateCar(carId: number, updateCarDto: UpdateCarDto): GeneralResponse<Car> {
    const id = Number(carId);

    if (isNaN(id)) {
      throw new BadRequestException(`Invalid car id "${carId}"`);
    }

    const carIndex = cars.findIndex((c) => c.id === id);

    if (carIndex === -1) {
      throw new NotFoundException(`Car with id "${carId}" not found`);
    }

    if (updateCarDto.brand || updateCarDto.model) {
      const newBrand = updateCarDto.brand ?? cars[carIndex].brand;
      const newModel = updateCarDto.model ?? cars[carIndex].model;

      const exists = cars.some(
        (c) =>
          c.id !== id &&
          c.brand.toLowerCase() === newBrand.toLowerCase() &&
          c.model.toLowerCase() === newModel.toLowerCase(),
      );

      if (exists) {
        throw new ConflictException(
          `Car with brand "${newBrand}" and model "${newModel}" already exists`,
        );
      }
    }

    cars[carIndex] = {
      ...cars[carIndex],
      ...updateCarDto,
    };

    return {
      statusCode: HttpStatus.OK,
      error: null,
      message: 'Car updated successfully',
      data: cars[carIndex],
    };
  }

  deleteCar(carId: number): GeneralResponse<Car> {
    const id = Number(carId);

    if (isNaN(id)) {
      throw new BadRequestException(`Invalid car id "${carId}"`);
    }

    const carIndex = cars.findIndex((c) => c.id === id);

    if (carIndex === -1) {
      throw new NotFoundException(`Car with id "${carId}" not found`);
    }

    const [deletedCar] = cars.splice(carIndex, 1);

    return {
      statusCode: HttpStatus.OK,
      error: null,
      message: 'Car deleted successfully',
      data: deletedCar,
    };
  }
}
