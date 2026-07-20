import { Directive, input } from '@angular/core';

import { ChipVariant } from '@smals-belgium-shared/vitals/chip';

@Directive({
  selector: 'mh-chip',
  host: {
    '[attr.title]': 'title()',
    '[attr.variant]': 'variant()',
  },
})
export class Chip {
  readonly title = input('');
  readonly variant = input<ChipVariant>('neutral');
}
