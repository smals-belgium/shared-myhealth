import type { NavMenu } from './nav-menu';

export * from './nav-group-open.event';
export * from './nav-menu';

declare global {
  interface HTMLElementTagNameMap {
    'mh-nav-menu': NavMenu;
  }
}
