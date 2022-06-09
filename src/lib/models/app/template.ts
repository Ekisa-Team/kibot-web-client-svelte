import type { BaseModel } from '../base-model';

export type Template = BaseModel<number> & {
  name: string;
  category: string;
  message: string;
  language: string;
  chatbotId: number;
};

export type TemplatePayload = {
  to: string;
  parameters: string[];
};

export type TemplateParameter = {
  key: string;
  value: string;
  inputValue: string;
  position: number;
};
