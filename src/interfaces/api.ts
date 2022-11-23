import { IPagination } from "./pagination";

export interface IApiResponse<T = any> {
  data: T;
  limit?: number;
  count?: number;
}
