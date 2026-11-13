/* eslint-disable no-param-reassign -- actually would make it less readable */
import { propUpdateEffect } from '../core/controller/prop-update.effect';
import type { OpenCloseHost } from '../core/open-close.behaviour';

import {
  getActiveIndex,
  getOptionAt,
  hasEnabledOptions,
  numOptions,
} from './menu-item.selectors';

const hasModifier = (event: KeyboardEvent) =>
  event.metaKey || event.ctrlKey || event.altKey;

const navigationKeys = ['ArrowUp', 'ArrowDown', 'Home', 'End'] as const;
type NavigationKey = (typeof navigationKeys)[number];
const isNavigationKeyEvent = (
  event: KeyboardEvent,
): event is KeyboardEvent & { key: NavigationKey } =>
  navigationKeys.includes(event.key as NavigationKey);

const proposeIndex = (host: OpenCloseHost, key: NavigationKey) => {
  const activeIndex = getActiveIndex(host);

  switch (key) {
    case 'ArrowDown':
      return activeIndex + 1;
    case 'ArrowUp':
      return activeIndex - 1;
    case 'Home':
      return 0;
    case 'End':
      return numOptions(host) - 1;
    default:
      return NaN;
  }
};

/**
 * Find the index of the next option that can be navigated to.
 * When at the start or end of the list, jump to the other side.
 * And skip over disabled options.
 */
const getNextEnabledIndex = (
  host: OpenCloseHost,
  index: number,
  direction: 1 | -1,
): number => {
  if (direction > 0 && index > numOptions(host) - 1) index = 0;
  if (direction < 0 && index < 0) index = numOptions(host) - 1;

  return getOptionAt(host, index).disabled
    ? getNextEnabledIndex(host, index + direction, direction)
    : index;
};

const navigate = (host: OpenCloseHost, key: NavigationKey) => {
  const direction = ['ArrowUp', 'End'].includes(key) ? -1 : 1;
  const indexToActivate = getNextEnabledIndex(
    host,
    proposeIndex(host, key),
    direction,
  );

  getOptionAt(host, indexToActivate).focus();
};

/**
 * Listen for keyboard events only when the menu is `open`.
 * Ignore any events with modifiers or Escape, Enter or Space keys
 * (popover needs to be able to capture those to close, and we want buttons an links actions to go through).
 * - Tab: close the popover and let the tab event take care of focusing the next element in the document
 * - arrows, home and end: move focus through the enabled options (does nothing when there are none)
 * - any other key: left alone
 */
export const keyboardController = (host: OpenCloseHost) => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (
      hasModifier(event) ||
      event.key === 'Escape' ||
      event.key === 'Enter' ||
      event.key === ' '
    )
      return;

    if (event.key === 'Tab') {
      host.open = false;
      // Let the Tab event bubble up for native focus behaviour
      return;
    }

    if (hasEnabledOptions(host) && isNavigationKeyEvent(event)) {
      event.preventDefault();
      event.stopImmediatePropagation();

      navigate(host, event.key);
    }
  };

  return propUpdateEffect(host, 'open', () => {
    if (host.open) host.addEventListener('keydown', onKeyDown);
    else host.removeEventListener('keydown', onKeyDown);
  });
};
