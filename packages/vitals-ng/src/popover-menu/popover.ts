import {
  booleanAttribute,
  Directive,
  inject,
  input,
  OnDestroy,
} from '@angular/core';

import { PopoverRegistry } from './popover-registry';

@Directive({
  exportAs: 'popover',
  host: {
    '[attr.id]': 'id',
    '[attr.open]': 'open() ? "" : null',
  },
})
export class Popover implements OnDestroy {
  readonly #registry = inject(PopoverRegistry);

  readonly open = input(false, { transform: booleanAttribute });

  protected readonly id = crypto.randomUUID();

  constructor() {
    this.#registry.set(this, this.id);
  }

  ngOnDestroy(): void {
    this.#registry.delete(this);
  }
}
