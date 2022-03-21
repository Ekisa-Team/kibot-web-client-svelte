export type ResponseWrapper<T> = {
  version: string;
  code: number;
  message: string;
  failed: boolean;
  data: T;
};
