import type { UserProfileClaim } from '../claims/user-profile-claim';

import type { MandatedProfile } from './mandated-profile';

/**
 * The profile information returned by the GET /profiles endpoint gives us all information about mandators and children
 * **except** their `subjectId`s, which are their relevant identifiers for token exchanging.
 */
export type ProfileResponse = Omit<UserProfileClaim, 'organizations'> & {
  /** Citizens that have mandated the user to act on their behalf */
  mandators?: MandatedProfile[];

  /** The use can act on behalf of his/her children */
  children?: MandatedProfile[];
};
