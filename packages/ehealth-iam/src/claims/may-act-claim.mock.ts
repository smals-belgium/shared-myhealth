import { anyMandatedProfileClaim } from './mandated-profile-claim.mock';
import type { MayActClaim } from './may-act-claim';

export const anyMayActClaim: MayActClaim = {
  sub: '',
  userProfile: { mandators: [anyMandatedProfileClaim] },
};

export const mayActClaimWith = (props: Partial<MayActClaim>) => ({
  ...anyMayActClaim,
  ...props,
});
