import { Directive, input } from '@angular/core';

export type TooltipSlotName = 'content';

@Directive({
  selector: '[mh-tooltip-slot]',
  host: {
    '[attr.slot]': 'slot()',
  },
})
export class TooltipSlot {
  readonly slot = input.required<TooltipSlotName>({ alias: 'mh-tooltip-slot' });
}
