import { Directive, input } from '@angular/core';

@Directive({
  selector: 'mh-removable-chip',
  host: {
    '[attr.title]': 'title()',
    '[attr.remove-label]': 'removeLabel()',
  },
})
export class RemovableChip {
  readonly title = input('');
  // eslint-disable-next-line @angular-eslint/no-input-rename
  readonly removeLabel = input<string>(undefined, { alias: 'remove-label' });
}
