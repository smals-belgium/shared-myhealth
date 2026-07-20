import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ICON } from '@smals-belgium-shared/vitals-ng/icon';

@Component({
  imports: [ICON],
  template: ` <h2>Icon</h2>
    normal: <mh-icon name="search"></mh-icon><br />
    rotate:
    <mh-icon
      name="search"
      [rotate]="45"
    ></mh-icon
    ><br />
    <h2>Sizes</h2>
    <mh-icon
      name="search"
      size="xs"
    ></mh-icon>
    <mh-icon
      name="search"
      size="s"
    ></mh-icon>
    <mh-icon
      name="search"
      size="m"
    ></mh-icon>
    <mh-icon
      name="search"
      size="l"
    ></mh-icon>
    <mh-icon
      name="search"
      size="xl"
    ></mh-icon>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconSandbox {}
