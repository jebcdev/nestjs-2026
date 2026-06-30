import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { type GeneralResponse } from 'src/shared/types/';
import { type Car } from './cars.data';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get('/')
  getAllCars(): GeneralResponse<Car[]> {
    return this.carsService.getAllCars();
  }

  @Get(':carId')
  getCarById(
    @Param('carId', ParseIntPipe) carId: number,
  ): GeneralResponse<Car> {
    return this.carsService.getCarById(carId);
  }

  @Post('/')
  createCar(@Body() createCarDto: CreateCarDto): GeneralResponse<Car> {
    return this.carsService.createCar(createCarDto);
  }

  @Patch(':carId')
  updateCar(
    @Param('carId', ParseIntPipe) carId: number,
    @Body() updateCarDto: UpdateCarDto,
  ): GeneralResponse<Car> {
    return this.carsService.updateCar(carId, updateCarDto);
  }

  @Delete(':carId')
  deleteCar(@Param('carId', ParseIntPipe) carId: number): GeneralResponse<Car> {
    return this.carsService.deleteCar(carId);
  }
}
