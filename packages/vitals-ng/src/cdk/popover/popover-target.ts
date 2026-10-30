import { computed, Directive, inject, input } from '@angular/core';

import { Popover } from './popover';
import { PopoverRegistry } from './popover-registry';

/**
 * @summary Allows for using `popvertarget` with Angular refs instead of plain HTML IDs.
 * Can only be used on elements that already support the `popovertarget` property.
 */
@Directive({
  selector: '[popovertarget]',
  host: { '[attr.popovertarget]': 'targetId()' },
})
export class PopoverTarget {
  readonly #registry = inject(PopoverRegistry);

  readonly target = input.required<Popover>({ alias: 'popovertarget' });

  protected readonly targetId = computed(() =>
    this.#registry.get(this.target()),
  );
}
