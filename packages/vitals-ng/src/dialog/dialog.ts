import { Directive, input } from '@angular/core';

import type { DialogVariant } from '@smals-belgium-shared/vitals/dialog';

@Directive({
  selector: 'mh-dialog',
  host: {
    '[attr.variant]': 'variant()',
    '[attr.closedby]': 'closedby()',
  },
})
export class Dialog {
  readonly variant = input<DialogVariant>('basic');
  readonly closedby = input<HTMLDialogElement['closedby']>('any');
}
