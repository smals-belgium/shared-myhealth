import '@smals-belgium-shared/vitals/checkbox';

import { NgModule } from '@angular/core';

import { Checkbox } from './checkbox';
import { CheckboxRequiredValidator } from './checkbox-required.validator';

export * from './checkbox';
export * from './checkbox-required.validator';

@NgModule({
  imports: [Checkbox, CheckboxRequiredValidator],
  exports: [Checkbox, CheckboxRequiredValidator],
})
export class CHECKBOX {}
