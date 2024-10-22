import { z } from 'zod';

export const CreateOrderItemSchema = z
  .object({
    productName: z.string({
      required_error: 'product name is required',
      invalid_type_error: 'name must be a string',
    }),
    productPrice: z
      .number({
        required_error: 'product price is required',
        invalid_type_error: 'product price must be a number',
      })
      .positive({ message: 'product price must be positive' }),
    quantity: z
      .number({
        required_error: 'product quantity is required',
        invalid_type_error: 'product quantity must be a number',
      })
      .positive({ message: 'product price must be positive' }),
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
        invalid_type_error: 'order id must be a string',
      })
      .uuid({ message: 'order id must be a uuid' })
      .optional()
      .nullable(),
  })
  .required();

export type CreateOrderItemDto = z.infer<typeof CreateOrderItemSchema>;
