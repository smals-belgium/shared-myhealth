import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BUTTON } from '@smals-belgium-shared/vitals-ng/button';
import { SELECT } from '@smals-belgium-shared/vitals-ng/select';

@Component({
  imports: [BUTTON, SELECT],
  template: ` <form id="form">
    <h2>Select</h2>

    <mh-select
      name="gender"
      required
      placeholder="select one"
      help="Please select your gender"
      hint="Male, female or other"
    >
      Gender
      <mh-option value="f">I'm a lady</mh-option>
      <mh-option value="m">I'm a gentleman</mh-option>
      <mh-option value="x">I'm not certain yet</mh-option>
    </mh-select>

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
export class SelectSandbox {}
