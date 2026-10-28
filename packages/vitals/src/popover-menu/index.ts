import type { PopoverMenu } from './popover-menu';

export * from './popover-menu';

declare global {
  interface HTMLElementTagNameMap {
    'mh-popver-menu': PopoverMenu;
  }
}
