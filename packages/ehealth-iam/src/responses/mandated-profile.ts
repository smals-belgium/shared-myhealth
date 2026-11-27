import type { UserProfileClaim } from '../claims/user-profile-claim';

/**
 * The user can act on behalf of other profiles (mandators or children).
 * This mandated profile is used only in the OidcProfile payload returned from `GET /profiles`.
 */
export type MandatedProfile = UserProfileClaim & {
  /** Full formatted name of the profile */
  name: string;

  /** The services that the user is mandated for: e.g. he may only be able to manage prescriptions */
  serviceNames: string[];
};
