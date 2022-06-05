export type ResponseWrapper<T> = {
  version: string;
  code: number;
  message: string;
  failed: boolean;
  exception?: {
    exceptionMessage?:
      | string
      | {
          errors: Record<string, string[]>;
          status: number;
          title: string;
          traceId: string;
          type: string;
        };
  };
  data: T;
};
