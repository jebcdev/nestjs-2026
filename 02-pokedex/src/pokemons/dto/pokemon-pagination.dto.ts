import { IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PokemonsPaginationDTO {
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  take?: number;

  @IsOptional()
  @IsPositive()
  @Min(0)
  @Type(() => Number)
  skip?: number;
}
