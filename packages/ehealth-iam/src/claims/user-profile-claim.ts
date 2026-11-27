import type { OrganizationClaim } from './organization-claim';

/** Minimal information of a user in eHealth: ID and name */
export type UserProfileClaim = {
  /** Social security identification number */
  ssin: string;

  /** User's first name */
  firstName: string;

  /** User's last name */
  lastName: string;

  /** Optional list of organizations the user belongs to */
  organizations?: OrganizationClaim[];
};
