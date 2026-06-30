import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SeederService {
  seedPokemons() {
    try {
    } catch (error) {
      console.log({ error });
      throw new Error(error);
    }
  }
}
