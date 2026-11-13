const isSlot = (el: unknown): el is HTMLSlotElement =>
  el !== null && typeof el === 'object' && 'assignedElements' in el;

export const slotDirective =
  (handleSlotChange: (slot: HTMLSlotElement) => void) =>
  ({ target }: Event) => {
    if (isSlot(target)) handleSlotChange(target);
    else
      throw new Error('Framework error: slotDirective used on wrong element');
  };
