export class CssParseError extends Error {
  readonly value: string;

  constructor(message: string, value: string) {
    super(message);
    this.value = value;
  }
}
