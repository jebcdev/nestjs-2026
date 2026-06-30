import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateCarDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  brand?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  model?: string;
}
