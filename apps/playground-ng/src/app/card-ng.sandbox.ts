import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BUTTON } from '@smals-belgium-shared/vitals-ng/button';
import { CARD } from '@smals-belgium-shared/vitals-ng/card';
import { CHECKBOX } from '@smals-belgium-shared/vitals-ng/checkbox';
import { ICON } from '@smals-belgium-shared/vitals-ng/icon';
import { ICON_BUTTON } from '@smals-belgium-shared/vitals-ng/icon-button';

@Component({
  imports: [BUTTON, CARD, CHECKBOX, ICON, ICON_BUTTON],
  template: `
    <h2>Card</h2>

    <mh-card appearance="outlined">
      <h2 mh-card-slot="header-title">Title</h2>
      <span mh-card-slot="header-end">badge tbd</span>
      <mh-checkbox
        checked
        mh-card-slot="header-extras-start"
      ></mh-checkbox>
      <span mh-card-slot="header-extras-end">tag tbd</span>
      <mh-icon-button
        name="menu"
        label="card menu"
        mh-card-slot="header-extras-end"
      ></mh-icon-button>
      card content
      <mh-button
        appearance="link"
        size="s"
        mh-card-slot="footer"
      >
        Details
        <mh-icon
          name="chevron_right"
          slot="end"
        ></mh-icon>
      </mh-button>
    </mh-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSandbox {}
