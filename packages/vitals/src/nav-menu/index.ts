import type { NavMenu } from './nav-menu';

export * from './nav-menu';

declare global {
  interface HTMLElementTagNameMap {
    'mh-nav-menu': NavMenu;
  }
}
