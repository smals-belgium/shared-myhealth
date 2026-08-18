import { Directive, input } from '@angular/core';

export type CardSlotName =
  | 'header'
  | 'header-start'
  | 'header-title'
  | 'header-end'
  | 'header-extras'
  | 'header-extras-start'
  | 'header-extras-end'
  | 'footer'
  | 'footer-start'
  | 'footer-end';

@Directive({
  selector: '[mh-card-slot]',
  host: {
    '[attr.slot]': 'slot()',
  },
})
export class CardSlot {
  readonly slot = input.required<CardSlotName>({ alias: 'mh-card-slot' });
}
