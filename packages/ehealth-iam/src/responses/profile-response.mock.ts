import { anyUserProfileClaim } from '../claims/user-profile-claim.mock';

import { ProfileResponse } from './profile-response';

export const anyProfileResponse: ProfileResponse = anyUserProfileClaim;

export const profileResponseWith = (props: Partial<ProfileResponse>) => ({
  ...anyProfileResponse,
  ...props,
});
