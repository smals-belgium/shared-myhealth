import type { MandatedProfile } from '../responses/mandated-profile';

/**
 * Same as an normal MandatedProfile response object,
 * but as a claim it only carries the SSIN and optional serviceNames.
 */
export type MandatedProfileClaim = Pick<MandatedProfile, 'ssin'> &
  Partial<Pick<MandatedProfile, 'serviceNames'>>;
