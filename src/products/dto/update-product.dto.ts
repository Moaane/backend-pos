import { z } from 'zod';

export const UpdateProductSchema = z
  .object({
    id: z
      .string({
        required_error: 'id is required',
        invalid_type_error: 'id must be a string',
      })
      .uuid({ message: 'id must be a uuid' }),
    name: z.string({ invalid_type_error: 'name must be a string' }).optional(),
    price: z
      .number({ invalid_type_error: 'price must be a number' })
      .optional(),
    categoryId: z
      .string({ invalid_type_error: 'category id must be a string' })
      .uuid()
      .optional()
      .nullable(),
    productTypeId: z
      .string({ invalid_type_error: 'product type id must be a string' })
      .uuid()
      .optional()
      .nullable(),
  })
  .strict();

export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
