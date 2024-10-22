import { CreateOrderItemSchema } from 'src/order-items/dto/create-order-item.dto';
import { z } from 'zod';

export const CreateOrderSchema = z
  .object({
    basePrice: z
      .number({
        required_error: 'base price is required',
        invalid_type_error: 'base price must be a number',
      })
      .positive({ message: 'base price must be positive' }),
    discount: z
      .number({ invalid_type_error: 'discount must be a number' })
      .positive({ message: 'discount must be positive' })
      .optional()
      .nullable(),
    tax: z
      .number({ invalid_type_error: 'tax must be a number' })
      .positive({ message: 'tax must be positive' }),
    totalPrice: z
      .number({
        required_error: 'total price is required',
        invalid_type_error: 'total price must be a number',
      })
      .positive({ message: 'total price must be positive' }),
    staffId: z
      .string({ invalid_type_error: 'staff id must be a string' })
      .uuid({ message: 'staff id must be uuid' })
      .optional()
      .nullable(),
    staffName: z.string({
      required_error: 'staff name is required',
      invalid_type_error: 'staff name must be a string',
    }),
    orderItems: z.array(CreateOrderItemSchema),
  })
  .required();

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;
