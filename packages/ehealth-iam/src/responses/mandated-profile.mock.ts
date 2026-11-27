import { anyUserProfileClaim } from '../claims/user-profile-claim.mock';

import type { MandatedProfile } from './mandated-profile';

export const anyMandatedProfile: MandatedProfile = {
  ...anyUserProfileClaim,
  name: '',
  serviceNames: [],
};

export const mandatedProfileWith = (props: Partial<MandatedProfile>) => ({
  ...anyMandatedProfile,
  ...props,
});
