import { IsInt, IsString, Min, Max, Length } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  @Min(1)
  @Max(10000)
  no: number;

  @IsString()
  @Length(1, 100)
  name: string;
}
