import type { NavGroup } from './nav-group';
import type { NavList } from './nav-list';

export * from './nav-group';
export * from './nav-list';

declare global {
  interface HTMLElementTagNameMap {
    'mh-nav-group': NavGroup;
    'mh-nav-list': NavList;
  }
}
