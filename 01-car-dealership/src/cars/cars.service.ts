import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { type GeneralResponse } from 'src/shared/types/';
import { type Car, cars } from './cars.data';

@Injectable()
export class CarsService {
  async getAllCars(): Promise<GeneralResponse<Car[]>> {
    try {
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'All Cars',
        data: cars,
      };
    } catch (error) {
      throw new Error('Error Fetching Cars');
    }
  }

  async getCarById(carId: number): Promise<GeneralResponse<Car>> {
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
      success: true,
      message: 'Car Found',
      data: car,
    };
  }
}
