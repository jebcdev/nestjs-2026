import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonsRepository: Repository<Pokemon>,
  ) {}

  logger: Logger = new Logger('----- PokemonService -----');

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = this.pokemonsRepository.create(createPokemonDto);
      await this.pokemonsRepository.save(pokemon);
      return pokemon;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    try {
      const pokemons = await this.pokemonsRepository.find();

      if (pokemons.length === 0) {
        throw new NotFoundException('No Pokemons found');
      }

      return pokemons;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(
        `Error finding all pokemons: ${error.message}`,
        error.stack,
      );

      throw new InternalServerErrorException('Error retrieving pokemons');
    }
  }

  async findOne(term: string) {
    try {
      let pokemon = await this.pokemonsRepository.findOneBy(
        isUUID(term) ? { id: term } : { no: +term },
      );

      if (!pokemon) {
        throw new NotFoundException(`Pokemon with term '${term}' not found`);
      }

      return pokemon;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handleDBExceptions(error);
    }
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term) as Pokemon;
      const updatedPokemon = await this.pokemonsRepository.preload({
        id: pokemon.id,
        ...updatePokemonDto,
      });

      if (!updatedPokemon) {
        throw new NotFoundException(`Pokemon with term '${term}' not found`);
      }

      await this.pokemonsRepository.save(updatedPokemon);
      return updatedPokemon;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const pokemon = await this.findOne(id) as Pokemon;
      await this.pokemonsRepository.remove(pokemon);
      return pokemon;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Unexpected error, check logs');
  }
}
