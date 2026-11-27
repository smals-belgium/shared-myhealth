export type OrganizationClaim = {
  name: string;
} & {
  hospital: HospitalClaim;
};

export type HospitalClaim = {
  name: string;
  nihii: string;
};
