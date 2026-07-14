import { Directive, forwardRef } from '@angular/core';
import {
  CheckboxRequiredValidator as NativeValidator,
  NG_VALIDATORS,
} from '@angular/forms';

@Directive({
  selector:
    'mh-slide-toggle[required][formControlName],mh-slide-toggle[required][formControl],mh-slide-toggle[required][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SlideToggleRequiredValidator),
      multi: true,
    },
  ],
})
export class SlideToggleRequiredValidator extends NativeValidator {}
