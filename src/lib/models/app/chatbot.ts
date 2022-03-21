import type { BaseModel } from '../base-model';

export type Chatbot = BaseModel<number> & {
  accessKey: string;
  clientApplicationId: number;
};
