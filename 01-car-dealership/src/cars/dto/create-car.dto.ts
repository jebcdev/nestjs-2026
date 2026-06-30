import { IsString, MinLength } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @MinLength(1)
  brand: string;

  @IsString()
  @MinLength(1)
  model: string;
}
