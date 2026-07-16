import {
  booleanAttribute,
  Directive,
  input,
  numberAttribute,
} from '@angular/core';

import type { TooltipPlacement } from '@smals-belgium-shared/vitals/tooltip';

@Directive({
  selector: 'mh-tooltip',
  host: {
    '[attr.content]': 'content()',
    '[attr.placement]': 'placement()',
    '[attr.open]': 'open() ? "" : null',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.show-delay]': 'showDelay()',
    '[attr.hide-delay]': 'hideDelay()',
  },
})
export class Tooltip {
  readonly content = input('');
  readonly placement = input<TooltipPlacement>('top');
  readonly open = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly showDelay = input(0, { transform: numberAttribute });
  readonly hideDelay = input(0, { transform: numberAttribute });
}
