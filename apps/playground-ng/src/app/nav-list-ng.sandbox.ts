import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BUTTON } from '@smals-belgium-shared/vitals-ng/button';
import { NAV_LIST } from '@smals-belgium-shared/vitals-ng/nav-list';

@Component({
  imports: [BUTTON, NAV_LIST],
  template: `
    <h2>NavList</h2>
    <mh-nav-list appearance="outlined">
      <mh-button>Item 1</mh-button>
      <mh-button>Item 2</mh-button>

      <mh-nav-group>
        <h4 slot="header">Plain group</h4>
        <mh-button>Group item 1</mh-button>
        <mh-button>Group item 2</mh-button>
        <mh-button [disabled]="true">Group item 3</mh-button>
        <mh-button>Group item 4</mh-button>
      </mh-nav-group>
    </mh-nav-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavListSandbox {}
