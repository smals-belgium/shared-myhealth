import { computed, Directive, inject, input } from '@angular/core';

import { Popover } from './popover';
import { PopoverRegistry } from './popover-registry';

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
