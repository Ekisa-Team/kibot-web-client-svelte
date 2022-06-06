export type ResponseWrapper<T> = {
  version: string;
  code: number;
  message: string;
  failed: boolean;
  exception?: {
    exceptionMessage?:
      | string
      | {
          message?: string;
          stackTrace?: string;
          errors: Record<string, string[]>;
          status: number;
          title: string;
          traceId: string;
          type: string;
        };
  };
  data: T;
};
