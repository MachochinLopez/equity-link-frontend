export interface Invoice {
  uuid: string;
  folio: string;
  issuer: string;
  receiver: string;
  currency: string;
  total: string;
  exchange_rate: string;
  created_at: string;
  updated_at: string;
}
