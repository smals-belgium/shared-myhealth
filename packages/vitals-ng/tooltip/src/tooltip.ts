import { Directive, input } from '@angular/core';

import type { TooltipPlacement } from '@myhealth/design-kit/tooltip';

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
  readonly open = input(false);
  readonly disabled = input(false);
  readonly showDelay = input(0);
  readonly hideDelay = input(0);
}
