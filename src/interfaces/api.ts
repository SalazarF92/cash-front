import { IPagination } from "./pagination";

export interface IApiResponse<T = any> {
  data: T;
  pagination?: IPagination;
  count?: {
    transactionsCount: number;
  };
}
