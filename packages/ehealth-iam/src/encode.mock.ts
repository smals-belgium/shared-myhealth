import type { AccessClaims } from './claims/access-claims';

const base64Url = (value: object) =>
  btoa(JSON.stringify(value))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/[=]+$/u, '');

/** An unsigned JWT; enough for code that only decodes tokens */
export const encodeJwt = (payload: Partial<AccessClaims>) =>
  [base64Url({ alg: 'none', typ: 'JWT' }), base64Url(payload), ''].join('.');
