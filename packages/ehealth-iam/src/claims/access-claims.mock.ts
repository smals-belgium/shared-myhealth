import type { AccessClaims } from './access-claims';
import { anyUserProfileClaim } from './user-profile-claim.mock';

export const anyAccessClaims: AccessClaims = {
  'allowed-origins': [],
  aud: [],
  auth_time: 0,
  azp: '',
  exp: 0,
  family_name: '',
  given_name: '',
  iat: 0,
  iss: '',
  jti: '',
  locale: 'en',
  name: '',
  preferred_username: '',
  resource_access: {},
  scope: '',
  sid: '',
  ssin: '',
  sub: '',
  userProfile: anyUserProfileClaim,
};

export const accessClaimsWith = (props: Partial<AccessClaims>) => ({
  ...anyAccessClaims,
  ...props,
});
