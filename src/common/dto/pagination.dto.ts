import { z } from 'zod';

export const PaginationSchema = z
  .object({
    page: z
      .number({ invalid_type_error: 'page must be a number' })
      .positive({ message: 'page must be positive' })
      .optional(),
    limit: z
      .number({ invalid_type_error: 'limit must be a number' })
      .min(1, { message: 'limit minimum is 1' })
      .optional(),
  })
  .strict();

export type PaginationDto = z.infer<typeof PaginationSchema>;
