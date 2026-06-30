import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { Pokemon } from '../pokemons/entities/pokemon.entity';

@Module({
  controllers: [SeederController],
  providers: [SeederService],
  imports: [TypeOrmModule.forFeature([Pokemon])],
})
export class SeederModule {}
