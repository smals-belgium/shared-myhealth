import { Directive, input } from '@angular/core';

import type { NavListAppearance } from '@smals-belgium-shared/vitals/nav-list';

@Directive({
  selector: 'mh-nav-list',
  host: {
    '[attr.appearance]': 'appearance()',
    '[attr.label]': 'label()',
  },
})
export class NavList {
  readonly appearance = input<NavListAppearance>('outlined');
  readonly label = input<string>();
}
