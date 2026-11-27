import { accessClaimsWith } from './claims/access-claims.mock';
import { decodeAccessToken } from './decoders';
import { encodeJwt } from './encode.mock';

describe('decodeAccessToken', () => {
  it(`returns the payload of a valid token`, () => {
    const token = accessClaimsWith({ sub: 'abc' });
    expect(decodeAccessToken(encodeJwt(token))).toEqual(token);
  });

  it(`returns an error for a malformed token`, () => {
    expect(decodeAccessToken('not-a-jwt')).toBeInstanceOf(Error);
  });
});
