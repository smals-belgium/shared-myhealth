import { Directive, input } from '@angular/core';

export type SlideToggleSlotName = 'start' | 'end';

@Directive({
  selector: '[mh-slide-toggle-slot]',
  host: {
    '[attr.slot]': 'slot()',
  },
})
export class SlideToggleSlot {
  readonly slot = input.required<SlideToggleSlotName>({
    alias: 'mh-slide-toggle-slot',
  });
}
