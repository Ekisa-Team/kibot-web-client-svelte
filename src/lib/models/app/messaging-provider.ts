import type { BaseModel } from '../base-model';

export type MessagingProvider = BaseModel<number> & {
  name: string;
  platformCode: string;
};
