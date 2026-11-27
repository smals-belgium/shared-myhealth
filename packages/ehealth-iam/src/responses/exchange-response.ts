/**
 * The full response from the EHealth token exchange service
 */
export type ExchangeResponse = {
  /** The access token issued by the authorization server */
  access_token: string;

  /** The type of the token issued. Always “bearer”. */
  token_type: 'Bearer';

  /** The lifetime in seconds of the access token. */
  expires_in: number;

  /** The refresh token, which can be used to obtain new access tokens using the same authorization grant. */
  refresh_token?: string;

  /**
   * The scope of the access token.
   * Optional if identical to the scope requested by the client; required otherwise.
   */
  scope: string;
};
