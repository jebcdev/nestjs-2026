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
import { PokemonsPaginationDTO } from './dto';

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

  async findAll(pokemonsPaginationDTO: PokemonsPaginationDTO) {
    try {
      const { take = 10, skip = 0 } = pokemonsPaginationDTO;

      const [pokemons, total] = await this.pokemonsRepository.findAndCount({
        take,
        skip,
        order: { no: 'ASC' },
      });

      if (pokemons.length === 0) {
        throw new NotFoundException('No Pokemons found');
      }

      const currentPage = Math.floor(skip / take) + 1;
      const totalPages = Math.ceil(total / take);

      return {
        data: pokemons,
        pagination: {
          total,
          take,skip,
          currentPage,
          totalPages,
          hasNextPage: currentPage < totalPages,
          hasPreviousPage: currentPage > 1,
        },
      };
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
      const pokemon = (await this.findOne(term)) as Pokemon;
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
      const pokemon = (await this.findOne(id)) as Pokemon;
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
