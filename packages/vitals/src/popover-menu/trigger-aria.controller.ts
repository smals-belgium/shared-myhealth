import { merge } from '../core/controller/merge.controller';
import { propUpdatedEffect } from '../core/controller/prop-updated.effect';
import type { OpenCloseHost } from '../core/open-close.behaviour';

import { focusTarget } from './focus-target';
import { root, triggers } from './trigger.selectors';

/**
 * Sync `aria-haspopup` and `aria-expanded` state with all triggers of this popover.
 *
 * Triggers can get linked at any moment after the host is connected (e.g. Angular binds `id` and `popovertarget` during
 * its own change detection), so besides every `open` state change, we watch the DOM until the first triggers are found.
 * Triggers linked after that only get synced on the next `open` state change.
 */
export const triggerAriaController = (host: OpenCloseHost) => {
  const sync = () => {
    const linked = triggers(host);

    linked.forEach(trigger => {
      focusTarget(trigger).setAttribute('aria-haspopup', 'menu');
      focusTarget(trigger).setAttribute('aria-expanded', String(host.open));
    });

    return linked.length > 0;
  };

  // Initialisation is done as soon as triggers were found, after which there is no need to keep watching the DOM
  const observer = new MutationObserver(() => {
    if (sync()) observer.disconnect();
  });

  const initTriggersOnceAvailable = {
    hostConnected() {
      if (sync()) return;

      observer.disconnect();
      observer.observe(root(host), {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['popovertarget', 'id'],
      });
    },

    hostDisconnected() {
      observer.disconnect();
    },
  };

  return merge(
    initTriggersOnceAvailable,
    propUpdatedEffect(host, 'open', sync),
  );
};
