import { Directive, input } from '@angular/core';

export type DialogSlotName = 'header-title' | 'header-actions' | 'actions';

@Directive({
  selector: '[mh-dialog-slot]',
  host: {
    '[attr.slot]': 'slot()',
  },
})
export class DialogSlot {
  readonly slot = input.required<DialogSlotName>({ alias: 'mh-dialog-slot' });
}
