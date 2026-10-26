/* eslint-disable import/max-dependencies -- we want to test all CVAs in one place */
import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { version } from '@smals-belgium-shared/vitals-ng';
import { BUTTON } from '@smals-belgium-shared/vitals-ng/button';
import { CHECKBOX } from '@smals-belgium-shared/vitals-ng/checkbox';
import { CHIP } from '@smals-belgium-shared/vitals-ng/chip';
import { ICON } from '@smals-belgium-shared/vitals-ng/icon';
import { RADIO } from '@smals-belgium-shared/vitals-ng/radio';
import { SELECT } from '@smals-belgium-shared/vitals-ng/select';
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
  imports: [
    FormsModule,
    JsonPipe,
    BUTTON,
    CHECKBOX,
    CHIP,
    ICON,
    RADIO,
    SELECT,
    TEXT_INPUT,
  ],
  templateUrl: './form.sandbox.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    mh-radio {
      width: 100%;
      padding: var(--mh-space-xs) 0;
      border-bottom: 1px solid var(--mh-color-neutral-border-quiet);
    }

    mh-radio::part(label) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      min-width: 0;
      gap: var(--mh-space-xs);
    }
  `,
})
export class FormSandbox {
  readonly version = version;
  readonly errors = formErrors;

  readonly text = '123';
  readonly gender2 = 'm';
  readonly profile = null;
}
