import { CssParseError } from './css-parse-error';

export const validate =
  <T extends Record<string, string>>(messages: T) =>
  (value: string) =>
  (msg: keyof T) =>
    new CssParseError(messages[msg], value);

export const trim = (value: string) => value.trim();

export const partition = <T>(xs: (T | Error)[]) => {
  const successes: T[] = [];
  const failures: Error[] = [];

  xs.forEach(x => (x instanceof Error ? failures.push(x) : successes.push(x)));

  return { successes, failures };
};
