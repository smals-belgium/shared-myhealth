import { Directive, input } from '@angular/core';

import type {
  CalloutVariant,
  CalloutAppearance,
} from '@smals-belgium-shared/vitals/callout';

@Directive({
  selector: 'mh-expandable-callout',
  host: {
    '[attr.variant]': 'variant()',
    '[attr.appearance]': 'appearance()',
    '[attr.open]': 'open() ? "" : null',
  },
})
export class ExpandableCallout {
  readonly variant = input<CalloutVariant>('info');
  readonly appearance = input<CalloutAppearance>('filled');
  readonly open = input<boolean>(false);
}
