import { Directive, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR, RadioControlValueAccessor } from '@angular/forms';

@Directive({
  selector: 'mh-radio',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Radio),
      multi: true,
    },
  ],
  host: {
    '[attr.title]': 'title()',
    '(change)': 'onChange()',
    '(blur)': 'onTouched()',
  },
})
export class Radio extends RadioControlValueAccessor {
  readonly title = input('');
}
