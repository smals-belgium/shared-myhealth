import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BUTTON } from '@myhealth/vitals-ng/button';
import { SLIDE_TOGGLE } from '@myhealth/vitals-ng/slide-toggle';

@Component({
  selector: 'app-slide-toggle',
  imports: [BUTTON, SLIDE_TOGGLE],
  template: ` <form id="form">
    <h2>Slide Toggle</h2>
    settings:
    <br />
    <mh-slide-toggle
      name="settings"
      value="notifications"
      >Enable notifications</mh-slide-toggle
    >
    <br />
    <mh-slide-toggle
      name="settings"
      value="darkmode"
      checked
      >Dark mode</mh-slide-toggle
    >
    <br />
    <mh-slide-toggle
      style="width: 100%"
      name="settings"
      value="analytics"
    >
      <span slot="start">Analytics</span>
    </mh-slide-toggle>
    <br />
    <mh-slide-toggle
      name="settings"
      value="newsletter"
      checked
      disabled
      >Newsletter subscription</mh-slide-toggle
    >
    <br />

    <mh-slide-toggle
      style="width: 100%"
      name="settings"
      value="newsletter"
      disabled
    >
      <span slot="start">Newsletter subscription</span>
    </mh-slide-toggle>
    <br />

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
export class SlideToggleComponent {}
