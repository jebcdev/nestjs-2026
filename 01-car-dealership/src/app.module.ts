import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';
import { CarsModule } from './cars/cars.module';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Adjust the path to your static files
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CarsModule,
    BrandsModule, // const envVar = this.configService.get<string>('envVar');
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
