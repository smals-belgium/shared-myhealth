import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BUTTON } from '@myhealth/vitals-ng/button';
import { CHECKBOX } from '@myhealth/vitals-ng/checkbox';

@Component({
  selector: 'app-checkbox',
  imports: [BUTTON, CHECKBOX],
  template: ` <form id="form">
    <h2>Checkbox</h2>
    preferences:
    <mh-checkbox
      name="prefs"
      value="all"
      [indeterminate]="true"
      >I like everything</mh-checkbox
    >
    <mh-checkbox
      name="prefs"
      value="f"
      >I like ladies</mh-checkbox
    >
    <mh-checkbox
      name="prefs"
      value="m"
      checked
      >I like gentlemen</mh-checkbox
    >
    <mh-checkbox
      name="prefs"
      value="x"
      checked
      disabled
      >I like people who don't know</mh-checkbox
    >

    <footer>
      <mh-button type="submit">submit</mh-button>
      <mh-button
        type="reset"
        appearance="outlined"
        >reset</mh-button
      >
    </footer>
  </form>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {}
