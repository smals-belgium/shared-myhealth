import type { IconButton } from './icon-button';

export * from './icon-button';

declare global {
  interface HTMLElementTagNameMap {
    'vitals-icon-button': IconButton;
  }
}
