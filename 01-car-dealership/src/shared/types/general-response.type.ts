import { HttpStatus } from '@nestjs/common';

export type GeneralResponse<T = undefined> =
  | {
      message: string;
      error: null;
      statusCode: HttpStatus;
      data: T;
    }
  | {
      message: string;
      error: string;
      statusCode: HttpStatus;
      data?: never;
    };
