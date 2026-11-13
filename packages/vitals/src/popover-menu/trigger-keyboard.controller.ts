import type { OpenCloseHost } from '../core/open-close.behaviour';

import { getLastEnabledOption } from './menu-item.selectors';
import { getEventTrigger, root } from './trigger.selectors';

const hasModifier = (event: KeyboardEvent) =>
  event.metaKey || event.ctrlKey || event.altKey || event.shiftKey;

/** Waits for the update that shows the popover and focuses its first item. */
const focusLastAfterUpdate = (host: OpenCloseHost) => {
  host.updateComplete
    .then(() => getLastEnabledOption(host)?.focus())
    .catch(() => undefined);
};

/**
 * Menu button keyboard pattern: ArrowDown opens the menu on its first item, ArrowUp on its last.
 * Enter and Space are left to the native `popovertarget` behaviour.
 */
export const triggerKeyboardController = (host: OpenCloseHost) => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (
      !getEventTrigger(host, event) ||
      hasModifier(event) ||
      host.open ||
      !['ArrowUp', 'ArrowDown'].includes(event.key)
    )
      return;

    event.preventDefault();
    host.open = true;

    // After the update, which shows the popover and focuses the first item
    if (event.key === 'ArrowUp') focusLastAfterUpdate(host);
  };

  return {
    hostConnected() {
      root(host).addEventListener('keydown', onKeyDown);
    },

    hostDisconnected() {
      root(host).removeEventListener('keydown', onKeyDown);
    },
  };
};
