import { PaginatedResult } from "../intefaces/pagination.interface";

export type PaginateOptions = {
  page?: number | string;
  perPage?: number | string;
};

export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;
