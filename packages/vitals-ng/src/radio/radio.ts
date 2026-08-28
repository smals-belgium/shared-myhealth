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
    // Doesn't really do anything because RadioCVA already tracks the `value` property,
    // but it doesn't reflect to an attribute and therefor makes it impossible to query on the value attribute.
    // e.g. without this binding `querySelector('mh-radio[value="m"]')` would return `null`.
    '[attr.value]': 'value',
    '(change)': 'onChange()',
    '(blur)': 'onTouched()',
  },
})
export class Radio extends RadioControlValueAccessor {
  readonly title = input('');
}
