import type { HospitalClaim, OrganizationClaim } from './organization-claim';

export const anyHospitalClaim: HospitalClaim = {
  name: '',
  nihii: '',
};

export const anyOrganizationClaim: OrganizationClaim = {
  name: '',
  hospital: anyHospitalClaim,
};

export const hospitalClaimWith = (
  props: Partial<HospitalClaim>,
): OrganizationClaim => ({
  name: props.name ?? '',
  hospital: {
    ...anyHospitalClaim,
    ...props,
  },
});
