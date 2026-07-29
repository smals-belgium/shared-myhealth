import { trim, validate } from './util';

/** https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/stop */
export type Stop = {
  /**
   * This attribute defines where the gradient stop is placed along the gradient vector.
   * Value in percentage (value from 0 to 100).
   */
  offset: number;

  /**
   * This attribute defines the color of the gradient stop.
   * Only hex values are supported.
   */
  color: `#${string}`;

  /**
   * This attribute defines the opacity of the gradient stop. It can be used as a CSS property.
   * Value in ratio from 0 t0 1.
   */
  opacity: number;
};

const validation = validate({
  hex: 'Invalid color value. Only hex values supported.',
  percent: 'Invalid percentage',
});

const hexRE = () => /^#[A-Fa-f0-9]{6}$/gmu;
const isValidHex = (value = ''): value is `#${string}` => hexRE().test(value);

const percentRE = () => /^(?<value>-?\d{1,3}(?<dec>\.\d+)?)%$/gmu;
const isValidPercent = (value = '') => percentRE().test(value);
const parsePercent = (value: string) =>
  parseFloat(percentRE().exec(value)?.groups?.value ?? '0');

export const isStop = (value: string) => value.startsWith('#');

export const parseStop = (value: string): Stop | Error => {
  const error = validation(value);
  const [color, percentage] = value.split(' ').map(trim);

  if (!isValidHex(color)) return error('hex');
  if (!isValidPercent(percentage)) return error('percent');

  return { color, offset: parsePercent(percentage), opacity: 1 };
};
