import { Directive, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR, SelectControlValueAccessor } from '@angular/forms';

import type { SelectSize } from '@smals-belgium-shared/vitals/select';

@Directive({
  selector: 'mh-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
  host: {
    '[attr.title]': 'title()',
    '[attr.size]': 'size()',
    '[attr.placeholder]': 'placeholder()',
    '[attr.help]': 'help()',
    '[attr.hint]': 'hint()',
    '(blur)': 'onTouched()',
    '(change)': 'onChange($any($event.target).value)',
  },
})
export class Select extends SelectControlValueAccessor {
  readonly title = input('');
  readonly size = input<SelectSize>('m');
  readonly placeholder = input<string>();
  readonly disabled = input(false);
  readonly help = input<string>();
  readonly hint = input<string>();
}
