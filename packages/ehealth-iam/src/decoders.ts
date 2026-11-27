import { InvalidTokenError, jwtDecode } from 'jwt-decode';

import type { AccessClaims } from './claims/access-claims';
import { OidcIdClaims } from './std-claims/oidc-id-claims';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters -- either this or casting
const decodeToken = <Claims>(
  idToken: string,
): Claims | InvalidTokenError | Error => {
  try {
    return jwtDecode<Claims>(idToken);
  } catch (error: unknown) {
    if (error instanceof InvalidTokenError) return error;
    return new Error('unknown JWT decoding error');
  }
};

export const decodeIdToken = decodeToken<OidcIdClaims>;
export const decodeAccessToken = decodeToken<AccessClaims>;
