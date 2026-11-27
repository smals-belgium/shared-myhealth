import type { MandatedProfileClaim } from './mandated-profile-claim';

/**
 * Additional information on the profiles on whose behalf the user "may act".
 * The most important property here is the `sub`, which is the `subjectId`, or identifier we need to use
 * when executing a profile switch.
 */
export type MayActClaim = {
  /** Subject identifier */
  sub: string;

  /**
   * A property for no reason.
   *
   * It can contain:
   * - one mandator
   * - or one child
   */
  userProfile:
    | { mandators: [MandatedProfileClaim] }
    | { children: [MandatedProfileClaim] };
};
