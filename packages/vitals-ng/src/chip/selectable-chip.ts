import { Directive, forwardRef, input } from '@angular/core';
import {
  CheckboxControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Directive({
  selector: 'mh-selectable-chip',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectableChip),
      multi: true,
    },
  ],
  host: {
    '[attr.title]': 'title()',
  },
})
export class SelectableChip extends CheckboxControlValueAccessor {
  readonly title = input('');
}
