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
      .string({ invalid_type_error: 'category id must be a string' })
      .uuid()
      .optional()
      .nullable(),
    productTypeId: z
      .string({ invalid_type_error: 'product type id must be a string' })
      .uuid()
      .optional()
      .nullable(),
    // image: z
    //   .string({
    //     invalid_type_error: 'product image must be string',
    //   })
    //   .base64({ message: 'product image must be a base64' })
    //   .optional()
    //   .nullable(),
  })
  .required();

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
