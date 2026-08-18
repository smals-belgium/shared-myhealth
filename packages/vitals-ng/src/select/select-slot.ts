import { Directive, input } from '@angular/core';

export type SelectSlotName = 'start' | 'end' | 'label' | 'help' | 'hint';

@Directive({
  selector: '[mh-select-slot]',
  host: {
    '[attr.slot]': 'slot()',
  },
})
export class SelectSlot {
  readonly slot = input.required<SelectSlotName>({ alias: 'mh-select-slot' });
}
