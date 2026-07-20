import { Directive, input } from '@angular/core';

import type {
  CalloutAppearance,
  CalloutVariant,
} from '@smals-belgium-shared/vitals/callout';

@Directive({
  selector: 'mh-callout',
  host: {
    '[attr.variant]': 'variant()',
    '[attr.appearance]': 'appearance()',
    '[attr.closable]': 'closable() ? "" : null',
  },
})
export class Callout {
  readonly variant = input<CalloutVariant>('info');
  readonly appearance = input<CalloutAppearance>('filled');
  readonly closable = input<boolean>(true);
}
