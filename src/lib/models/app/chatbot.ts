import type { BaseModel } from '../base-model';

export type Chatbot = BaseModel<number> & {
  name: string;
  accessKey: string;
  clientApplicationId: number;
};
