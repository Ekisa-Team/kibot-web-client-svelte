import type { BaseModel } from '../base-model';

export type Channel = BaseModel<number> & {
  platformPhoneNumber: string;
  platformAccountSid: string;
  platformAuthToken: string;
  httpMethodCode: number; // TODO: must create enum
  callbackUrl: string;
  messagingProviderId: number;
  chatbotId: number;
};
