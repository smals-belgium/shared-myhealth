import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ICON_BUTTON } from '@smals-belgium-shared/vitals-ng/icon-button';

@Component({
  imports: [ICON_BUTTON],
  template: ` <h2>Icon Button</h2>
    <mh-icon-button
      name="search"
      title="search"
    ></mh-icon-button>
    <mh-icon-button
      name="search"
      title="search"
      [disabled]="true"
    ></mh-icon-button
    ><br />
    <mh-icon-button
      name="search"
      label="search"
      loudness="loud"
    ></mh-icon-button>
    <mh-icon-button
      name="search"
      label="search"
      loudness="loud"
      [disabled]="true"
    ></mh-icon-button
    ><br />
    <mh-icon-button
      name="search"
      label="search"
      appearance="square"
    ></mh-icon-button>
    <mh-icon-button
      name="search"
      label="search"
      appearance="square"
      [disabled]="true"
    ></mh-icon-button
    ><br />
    <mh-icon-button
      name="search"
      label="search"
      appearance="square"
      loudness="loud"
    ></mh-icon-button>
    <mh-icon-button
      name="search"
      label="search"
      appearance="square"
      loudness="loud"
      [disabled]="true"
    ></mh-icon-button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonSandbox {}
