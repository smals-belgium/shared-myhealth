import { anyAccessClaims } from './access-claims.mock';
import type {
  ExchangedAccessClaims,
  ManagedChildProfileClaim,
  ManagedMandateProfileClaim,
} from './exchanged-access-claims';
import { anyUserProfileClaim } from './user-profile-claim.mock';

export const anyManagedChildProfile: ManagedChildProfileClaim = {
  ...anyUserProfileClaim,
  children: [anyUserProfileClaim],
};

export const managedChildProfileWith = (
  props: Partial<ManagedChildProfileClaim>,
) => ({
  ...anyManagedChildProfile,
  ...props,
});

export const anyManagedMandateProfile: ManagedMandateProfileClaim = {
  ...anyUserProfileClaim,
  mandators: [anyUserProfileClaim],
};

export const managedMandateProfileWith = (
  props: Partial<ManagedMandateProfileClaim>,
) => ({
  ...anyManagedChildProfile,
  ...props,
});

export const anyExchangedAccessClaims: ExchangedAccessClaims = {
  ...anyAccessClaims,
  ssin: '',
  userProfile: anyManagedChildProfile,
};

export const exchangedAccessClaimsWith = (
  props: Partial<ExchangedAccessClaims>,
) => ({
  ...anyExchangedAccessClaims,
  ...props,
});
