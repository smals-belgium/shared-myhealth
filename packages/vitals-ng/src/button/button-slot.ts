/* eslint-disable max-classes-per-file -- they're just aliases */
import { Directive, input } from '@angular/core';

export type ButtonSlotName = 'start' | 'end';

@Directive({
  selector: '[mh-a-slot]',
  host: {
    '[attr.slot]': 'slot()',
  },
})
export class AnchorSlot {
  readonly slot = input.required<ButtonSlotName>({ alias: 'mh-a-slot' });
}

@Directive({
  selector: '[mh-button-slot]',
  host: {
    '[attr.slot]': 'slot()',
  },
})
export class ButtonSlot {
  readonly slot = input.required<ButtonSlotName>({ alias: 'mh-button-slot' });
}
