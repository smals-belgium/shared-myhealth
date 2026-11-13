import { slotDirective } from './slot.directive';

const focusableSelector = [
  'a[href]',
  'button',
  'input:not([type="hidden"])',
  'select',
  'textarea',
  'summary',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]',
].join(',');

const isTabStop = (element: Element) =>
  element.matches(focusableSelector) &&
  !element.matches(':disabled, [inert]') &&
  element.getAttribute('tabindex') !== '-1';

const containsTabStop = (element: Element): boolean =>
  isTabStop(element) ||
  Array.from(element.shadowRoot?.children ?? []).some(containsTabStop) ||
  Array.from(element.children).some(containsTabStop);

/** Whether any of the elements, or their descendants (including inside open shadow roots), is a tab stop. */
const hasFocusableContent = (slot: HTMLSlotElement) =>
  slot.assignedElements().some(containsTabStop);

export const slotFocusContainerDirective = slotDirective(slot =>
  hasFocusableContent(slot)
    ? slot.parentElement?.removeAttribute('tabindex')
    : slot.parentElement?.setAttribute('tabindex', '0'),
);
