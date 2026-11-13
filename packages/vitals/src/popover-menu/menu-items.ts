import { focusTarget } from './focus-target';
import { getAllOptions } from './menu-item.selectors';

/** Make the menu's slotted buttons and links behave as menu items, programmatically focusable only. */
export const initMenuItems = (host: HTMLElement) =>
  getAllOptions(host).forEach(item => {
    focusTarget(item).setAttribute('role', 'menuitem');
    focusTarget(item).setAttribute('tabindex', '-1');
  });
