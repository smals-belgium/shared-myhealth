import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { version } from '@smals-belgium-shared/vitals-ng';
import { BUTTON } from '@smals-belgium-shared/vitals-ng/button';
import { CHECKBOX } from '@smals-belgium-shared/vitals-ng/checkbox';
import { RADIO } from '@smals-belgium-shared/vitals-ng/radio';
import { TEXT_INPUT } from '@smals-belgium-shared/vitals-ng/text-input';

const formErrors = (form: NgForm) =>
  Object.keys(form.controls).reduce(
    (errors, key) =>
      form.controls[key].errors
        ? {
            ...errors,
            [key]: form.controls[key].errors,
          }
        : errors,
    {},
  );

@Component({
  imports: [FormsModule, JsonPipe, BUTTON, CHECKBOX, RADIO, TEXT_INPUT],
  templateUrl: './form.sandbox.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSandbox {
  readonly version = version;
  readonly errors = formErrors;
}
