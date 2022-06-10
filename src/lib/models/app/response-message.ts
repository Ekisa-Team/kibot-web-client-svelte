import type { BaseModel } from '../base-model';

export type ResponseMessage = BaseModel<number> & {
  intention: string;
  message: string;
  chatbotId: number;
};
