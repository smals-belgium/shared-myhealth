import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BUTTON } from '@smals-belgium-shared/vitals-ng/button';
import { RADIO } from '@smals-belgium-shared/vitals-ng/radio';

@Component({
  imports: [BUTTON, RADIO],
  template: ` <form id="form">
    <h2>Radio</h2>
    gender:
    <mh-radio
      name="gender"
      value="f"
      >I'm a lady</mh-radio
    >
    <mh-radio
      name="gender"
      value="m"
      checked
      >I'm a gentleman</mh-radio
    >
    <mh-radio
      name="gender"
      value="x"
      disabled
      >I don't know</mh-radio
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
export class RadioSandbox {}
