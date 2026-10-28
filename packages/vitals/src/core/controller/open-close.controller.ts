import { LitElement, ReactiveController } from 'lit';

import { cssStateReflect } from '../css/css-state-reflect';

import { propUpdatedEffect } from './prop-updated.effect';

/** Properties to be implemented by a Lit component that has an open/closed state. */
export type OpenCloseHost = LitElement & {
  /** Whether the component is currently open or not. */
  open: boolean;
};

/**
 * A Lit controller that tracks the open/closed state of any `popover` element in two directions:
 * - when the `open` property is set, toggle the `popover` accordingly
 * - when the `popover` is toggled by the user, reflect that in the `open` state
 */
export const openCloseController = (
  host: OpenCloseHost,
): ReactiveController => {
  host.addController(cssStateReflect(host, ['open']));

  host.addController(
    propUpdatedEffect(host, 'open', () => host.togglePopover(host.open)),
  );

  const onToggle = (event: ToggleEvent) =>
    (host.open = event.newState === 'open');

  return {
    hostConnected() {
      host.addEventListener('toggle', onToggle);
    },

    hostDisconnected() {
      host.removeEventListener('toggle', onToggle);
    },
  };
};
