import { ChangeDetectionStrategy, Component } from '@angular/core';

import { version } from '@myhealth/vitals-ng';

@Component({
  template: `Angular version: {{ version }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSandbox {
  readonly version = version;
}
