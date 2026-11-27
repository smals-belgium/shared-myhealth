import type { AccessClaims } from './access-claims';
import type { UserProfileClaim } from './user-profile-claim';

export type ManagedChildProfileClaim = UserProfileClaim & {
  children: [UserProfileClaim];
};

export type ManagedMandateProfileClaim = UserProfileClaim & {
  mandators: [UserProfileClaim];
};

/**
 * Exchanged access claims differ from normal access claims in that
 * - it _might_ have a client_id property added to it
 * - the `userProfile` claim now contains additional data on the managed mandator or child
 * (**but** they don't contain their `serviceNames`)
 *
 * **Important note:**
 * The exchanged access claims are still those of the main authenticated user.
 * The claims for a managed profile are to be found under `userProfile#children` or `userProfile#mandators`.
 * Only one managed profile is active at a time.
 */
export type ExchangedAccessClaims = Omit<AccessClaims, 'userProfile'> & {
  /** Sometimes there, sometimes not; don't count on it */
  client_id?: string;

  /** Here the `userProfile` also contains mandator or child data, as a list with one item. */
  userProfile: ManagedChildProfileClaim | ManagedMandateProfileClaim;
};
