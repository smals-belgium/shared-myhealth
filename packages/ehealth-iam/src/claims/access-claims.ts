import type { JwtClaims } from '../std-claims/jwt-claims';
import type { OidcIdClaims } from '../std-claims/oidc-id-claims';
import type { OidcStandardClaims } from '../std-claims/oidc-standard-claims';

import type { MayActClaim } from './may-act-claim';
import type { UserProfileClaim } from './user-profile-claim';

/**
 * Decoded `AccessToken`
 * Contains links to other profiles through their `ssin`s, but no additional profile information.
 *
 * And yes, ehealth is mixing access and ID claims into one object.
 */
export type AccessClaims = Required<
  Pick<JwtClaims, 'aud' | 'iat' | 'iss' | 'jti' | 'exp'>
> &
  Required<
    Pick<
      OidcStandardClaims,
      'sub' | 'name' | 'given_name' | 'family_name' | 'preferred_username'
    >
  > &
  Required<Pick<OidcIdClaims, 'sid' | 'auth_time' | 'azp'>> & {
    /** Social security identification number */
    ssin: string;

    /**
     * User's language as ISO-2.
     *
     * This overrides OIDC standards:
     * `locale` is an OIDC standard claim, but the format should be `en-US` or `en_US` according to the spec.
     * EHealth only returns the language code, so `en`.
     */
    locale: 'nl' | 'fr' | 'de' | 'en';

    /**
     * For the main user, this contains basic information.
     * It changes after profile switching though.
     * @see ExchangeResponse
     */
    userProfile: UserProfileClaim;

    /** Links to mandates and children of this profile */
    may_act?: MayActClaim[];

    /** Domains that are allowed to query this eHealth service */
    'allowed-origins': string[];

    /** Space separated string of OAuth scopes */
    scope: string;

    /** OAuth resource access */
    resource_access: Record<string, { roles: string[] }>;
  };
