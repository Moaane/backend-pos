import { z } from 'zod';

export const CreateProductSchema = z
  .object({
    name: z.string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    }),
    price: z.number({
      required_error: 'price is required',
      invalid_type_error: 'price must ba a number',
    }),
    categoryId: z
      .string({ invalid_type_error: 'category id must be string' })
      .uuid()
      .optional()
      .nullable(),
    productTypeId: z
      .string({ invalid_type_error: 'product type id must be string' })
      .uuid()
      .optional()
      .nullable(),
  })
  .required();

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
