import { Directive, forwardRef } from '@angular/core';
import {
  CheckboxRequiredValidator as NativeValidator,
  NG_VALIDATORS,
} from '@angular/forms';

@Directive({
  selector:
    'mh-checkbox[required][formControlName],mh-checkbox[required][formControl],mh-checkbox[required][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CheckboxRequiredValidator),
      multi: true,
    },
  ],
})
export class CheckboxRequiredValidator extends NativeValidator {}
