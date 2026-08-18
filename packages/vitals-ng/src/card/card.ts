import { Directive, input } from '@angular/core';

import type { CardAppearance } from '@smals-belgium-shared/vitals/card';

@Directive({
  selector: 'mh-card',
  host: {
    '[attr.appearance]': 'appearance()',
  },
})
export class Card {
  readonly appearance = input<CardAppearance>('raised');
}
