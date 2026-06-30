// pokemon.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsUUID, IsInt, IsString, Min, Max, Length } from 'class-validator';

@Entity('pokemons')
export class Pokemon {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({ type: 'int', unique: true, nullable: false })
  @IsInt()
  @Min(1)
  @Max(10000)
  no: number;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  @IsString()
  @Length(1, 100)
  name: string;
}
