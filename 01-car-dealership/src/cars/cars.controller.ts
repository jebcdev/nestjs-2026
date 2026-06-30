import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { type GeneralResponse } from 'src/shared/types/';
import { type Car } from './cars.data';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get('/')
  async getAllCars(): Promise<GeneralResponse<Car[]>> {
    return this.carsService.getAllCars();
  }

  @Get(':carId')
  async getCarById(
    @Param('carId', ParseIntPipe) carId: number,
  ): Promise<GeneralResponse<Car>> {
    return this.carsService.getCarById(carId);
  }
}
