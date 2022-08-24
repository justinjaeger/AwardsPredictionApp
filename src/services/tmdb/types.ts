export interface iTmdbResponse<T> {
  status: string | number;
  message?: string;
  data: T;
}
