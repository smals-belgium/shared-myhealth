import { Directive, input } from '@angular/core';

export type OptionSlotName = 'start' | 'end';

@Directive({
  selector: '[mh-option-slot]',
  host: {
    '[attr.slot]': 'slot()',
  },
})
export class OptionSlot {
  readonly slot = input.required<OptionSlotName>({ alias: 'mh-option-slot' });
}
