import { z } from 'zod';

export const CreateProductTypeSchema = z
  .object({
    name: z.string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    }),
  })
  .required();

export type CreateProductTypeDto = z.infer<typeof CreateProductTypeSchema>;
