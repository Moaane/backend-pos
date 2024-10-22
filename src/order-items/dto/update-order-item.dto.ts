import { z } from 'zod';

export const UpdateOrderItemSchema = z
  .object({
    id: z
      .string({
        required_error: 'id is required',
        invalid_type_error: 'id must be a string',
      })
      .uuid({ message: 'id must be a uuid' }),
    productName: z
      .string({
        required_error: 'product name is required',
        invalid_type_error: 'name must be a string',
      })
      .optional(),
    productPrice: z
      .number({
        required_error: 'product price is required',
        invalid_type_error: 'product price must be a number',
      })
      .positive({ message: 'product price must be positive' })
      .optional(),
    quantity: z
      .number({
        required_error: 'product quantity is required',
        invalid_type_error: 'product quantity must be a number',
      })
      .positive({ message: 'product price must be positive' })
      .optional(),
    productId: z
      .string({
        required_error: 'product id is required',
        invalid_type_error: 'product id must be a string',
      })
      .uuid({ message: 'product id must be a uuid' })
      .optional()
      .nullable(),
    orderId: z
      .string({
        required_error: 'order id is required',
        invalid_type_error: 'order id must be a string',
      })
      .uuid({ message: 'order id must be a uuid' })
      .optional(),
  })
  .strict();

export type UpdateOrderItemDto = z.infer<typeof UpdateOrderItemSchema>;
