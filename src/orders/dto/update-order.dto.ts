import { z } from 'zod';

export const UpdateOrderSchema = z
  .object({
    id: z
      .string({
        required_error: 'id is required',
        invalid_type_error: 'id must be a string',
      })
      .uuid({ message: 'id must be a uuid' }),
    basePrice: z
      .number({
        required_error: 'base price is required',
        invalid_type_error: 'base price must be a number',
      })
      .positive({ message: 'base price must be positive' })
      .optional(),
    discount: z
      .number({ invalid_type_error: 'discount must be a number' })
      .positive({ message: 'discount must be positive' })
      .optional()
      .nullable(),
    tax: z
      .number({ invalid_type_error: 'tax must be a number' })
      .positive({ message: 'tax must be positive' })
      .optional(),
    totalPrice: z
      .number({
        required_error: 'total price is required',
        invalid_type_error: 'total price must be a number',
      })
      .positive({ message: 'total price must be positive' })
      .optional(),
    staffId: z
      .string({ invalid_type_error: 'staff id must be a string' })
      .uuid({ message: 'staff id must be uuid' })
      .optional()
      .nullable(),
    staffName: z
      .string({
        required_error: 'staff name is required',
        invalid_type_error: 'staff name must be a string',
      })
      .optional(),
  })
  .strict();

export type UpdateOrderDto = z.infer<typeof UpdateOrderSchema>;
