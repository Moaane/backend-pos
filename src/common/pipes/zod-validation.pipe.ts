import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  async transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = await this.schema.parseAsync(value);
      console.log(parsedValue);

      return parsedValue;
    } catch (error) {
      console.log(error.errors);
      
      throw new BadRequestException(
        error.errors.map((err: { message: any }) => err.message).join(', '),
      );
    }
  }
}
