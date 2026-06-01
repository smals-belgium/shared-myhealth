import type { Divider } from './divider';

export * from './divider';

declare global {
  interface HTMLElementTagNameMap {
    'vitals-divider': Divider;
  }
}
