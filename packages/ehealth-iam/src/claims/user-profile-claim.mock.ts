import type { UserProfileClaim } from './user-profile-claim';

export const anyUserProfileClaim: UserProfileClaim = {
  ssin: '',
  firstName: '',
  lastName: '',
};

export const userProfileClaimWith = (props: Partial<UserProfileClaim>) => ({
  ...anyUserProfileClaim,
  ...props,
});
