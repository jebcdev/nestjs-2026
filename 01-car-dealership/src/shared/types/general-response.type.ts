import { HttpStatus } from '@nestjs/common';

export type GeneralResponse<T = undefined> =
  | {
      statusCode: HttpStatus.OK | HttpStatus.CREATED | HttpStatus.ACCEPTED; // Solo status exitosos
      success: true;
      error?: false;
      message: string;
      data: T;
    }
  | {
      statusCode: Exclude<
        HttpStatus,
        HttpStatus.OK | HttpStatus.CREATED | HttpStatus.ACCEPTED
      >; // Cualquier status excepto los exitosos
      success: false;
      error: true;
      message: string;
      data?: never;
    };
