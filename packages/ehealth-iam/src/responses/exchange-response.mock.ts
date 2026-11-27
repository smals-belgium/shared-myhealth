import type { ExchangeResponse } from './exchange-response';

export const anyExchangeResponse: ExchangeResponse = {
  access_token: '',
  token_type: 'Bearer',
  expires_in: 0,
  scope: '',
};

export const exchangeResponseWith = (props: Partial<ExchangeResponse>) => ({
  ...anyExchangeResponse,
  ...props,
});
