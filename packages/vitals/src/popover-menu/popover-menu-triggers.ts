import { OpenCloseHost } from '../core/open-close.behaviour';

import { triggerAriaController } from './trigger-aria.controller';
import { triggerKeyboardController } from './trigger-keyboard.controller';
import { getEventTrigger, root, triggers } from './trigger.selectors';

/**
 * Multiple triggers can open a popover;
 * we keep track of the last one that was interacted with to make it the positioning anchor.
 * Listeners are delegated to the root, so triggers that are rendered or linked later are picked up too.
 */
const lazyAnchor = (host: OpenCloseHost) => {
  const last: { trigger?: HTMLElement } = {};
  const listeners = { abort: new AbortController() };

  const track = (event: Event) => {
    const trigger = getEventTrigger(host, event);
    if (trigger) last.trigger = trigger;
  };

  host.addController({
    hostConnected() {
      listeners.abort = new AbortController();
      const { signal } = listeners.abort;

      ['pointerdown', 'keydown'].forEach(type =>
        root(host).addEventListener(type, track, { capture: true, signal }),
      );
    },

    hostDisconnected() {
      listeners.abort.abort();
    },
  });

  // Type of NodeListOf.item() is wrong: it can return null, which is an `object` and can break things downstream.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return () => last.trigger ?? triggers(host).item(0) ?? undefined;
};

export const initTriggers = (host: OpenCloseHost) => {
  host.addController(triggerAriaController(host));
  host.addController(triggerKeyboardController(host));

  return lazyAnchor(host);
};
