import { HttpStatus } from '@nestjs/common';

export class NotFoundErrorResponseDTO {
  code: HttpStatus;
  message: string;
}
