import { slotDirective } from './slot.directive';

export const slotContentDirective = slotDirective((slot: HTMLSlotElement) =>
  slot.toggleAttribute(
    'mh-has-slotted-content',
    slot.assignedElements().length > 0,
  ),
);
