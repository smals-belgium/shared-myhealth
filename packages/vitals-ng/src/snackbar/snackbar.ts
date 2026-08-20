import { Directive, input } from '@angular/core';

import { DEFAULT_SNACKBAR_DURATION } from '@smals-belgium-shared/vitals/snackbar';

@Directive({
  selector: 'mh-snackbar',
  host: {
    '[attr.action]': 'action()',
    '[attr.politeness]': 'politeness()',
    '[attr.duration]': 'duration()',
  },
})
export class Snackbar {
  readonly action = input<string>();
  readonly politeness = input<'polite' | 'assertive'>('polite');
  readonly duration = input<number>(DEFAULT_SNACKBAR_DURATION);
}
