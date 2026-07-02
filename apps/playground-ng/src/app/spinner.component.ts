import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SPINNER } from '@myhealth/vitals-ng/spinner';

@Component({
  selector: 'app-spinner',
  imports: [SPINNER],
  template: ` <h2>Spinner</h2>
    <mh-spinner lang="en"></mh-spinner>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
