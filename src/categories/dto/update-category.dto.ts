import { z } from 'zod';

export const UpdateCategorySchema = z
  .object({
    id: z
      .string({
        required_error: 'id is required',
        invalid_type_error: 'id must be a string',
      })
      .uuid({ message: 'id must be a uuid' }),
    name: z.string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    }),
  })
  .required();

export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;
