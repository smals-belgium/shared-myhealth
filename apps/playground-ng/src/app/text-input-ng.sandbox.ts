import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BUTTON } from '@smals-belgium-shared/vitals-ng/button';
import { TEXT_INPUT } from '@smals-belgium-shared/vitals-ng/text-input';

@Component({
  imports: [BUTTON, TEXT_INPUT],
  template: ` <form id="form">
    <h2>Select</h2>

    <mh-text-input
      name="textInput"
      required
      minlength="2"
      maxlength="10"
      pattern="\\d*"
      help="Mininmum 2 chars, maximum 10, and must be digits"
      hint="But only numbers are valid"
    >
      text
    </mh-text-input>

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
export class TextInputSandbox {}
