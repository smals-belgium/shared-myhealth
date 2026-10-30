import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BUTTON } from '@smals-belgium-shared/vitals-ng/button';
import { ICON_BUTTON } from '@smals-belgium-shared/vitals-ng/icon-button';
import { POPOVER_MENU } from '@smals-belgium-shared/vitals-ng/popover-menu';

@Component({
  imports: [BUTTON, ICON_BUTTON, POPOVER_MENU],
  template: `
    <h2>Popover Menu</h2>
    <mh-icon-button
      name="more_vert"
      label="little menu"
      [popovertarget]="menu"
    >
    </mh-icon-button>

    <mh-popover-menu #menu="popover">
      <mh-button>Edit</mh-button>
      <mh-a>Delete</mh-a>
      <mh-a [disabled]="true">Disabled</mh-a>
    </mh-popover-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverMenuSandbox {}
