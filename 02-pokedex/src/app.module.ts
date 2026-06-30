import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonsModule } from './pokemons/pokemons.module';
import { SeederResolver } from './seeder/seeder.resolver';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Adjust the path to your static files
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }), // const envVar = this.configService.get<string>('envVar');
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE as any) || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'nestjs-pokedex',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }), PokemonsModule, SeederModule,
  ],
  controllers: [],
  providers: [SeederResolver],
})
export class AppModule {}
