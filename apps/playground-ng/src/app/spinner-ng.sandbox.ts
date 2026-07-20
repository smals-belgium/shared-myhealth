import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SPINNER } from '@smals-belgium-shared/vitals-ng/spinner';

@Component({
  imports: [SPINNER],
  template: ` <h2>Spinner</h2>
    <mh-spinner lang="en"></mh-spinner>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerSandbox {}
