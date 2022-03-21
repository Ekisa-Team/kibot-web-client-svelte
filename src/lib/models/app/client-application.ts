import type { BaseModel } from '../base-model';

export type ClientApplication = BaseModel<number> & {
  name: string;
  isActive: boolean;
};
