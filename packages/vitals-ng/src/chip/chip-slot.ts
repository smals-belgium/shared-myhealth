import { Directive, input } from '@angular/core';

export type ChipSlotName = 'start';

@Directive({
  selector: '[mh-chip-slot]',
  host: {
    '[attr.slot]': 'slot()',
  },
})
export class ChipSlot {
  readonly slot = input.required<ChipSlotName>({ alias: 'mh-chip-slot' });
}
