import { ApiOptionsBase } from "./api-options-base";

export interface SubscribePayload {
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  email?: string;
}

export type SubscribeApiOptions = ApiOptionsBase<'subscribe', SubscribePayload>;
