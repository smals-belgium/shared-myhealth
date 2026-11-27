import type { MandatedProfileClaim } from './mandated-profile-claim';

export const anyMandatedProfileClaim: MandatedProfileClaim = {
  ssin: '',
};

export const mandatedProfileClaimWith = (
  props: Partial<MandatedProfileClaim>,
) => ({
  ...anyMandatedProfileClaim,
  ...props,
});
