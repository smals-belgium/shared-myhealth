import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DIVIDER } from '@myhealth/vitals-ng/divider';

@Component({
  selector: 'app-divider',
  imports: [DIVIDER],
  template: `
    <h2>Divider</h2>
    <mh-divider loudness="louder"></mh-divider>
    <mh-divider loudness="loud"></mh-divider>
    <mh-divider></mh-divider>
    <mh-divider loudness="quiet"></mh-divider>
    <mh-divider loudness="quieter"></mh-divider>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {}
