import { Directive, forwardRef, input } from '@angular/core';
import {
  CheckboxControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Directive({
  selector: 'mh-slide-toggle',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlideToggle),
      multi: true,
    },
  ],
  host: {
    '[attr.title]': 'title()',
    '(change)': 'onChange($any($event.target).checked)',
    '(blur)': 'onTouched()',
  },
})
export class SlideToggle extends CheckboxControlValueAccessor {
  readonly title = input('');
}
