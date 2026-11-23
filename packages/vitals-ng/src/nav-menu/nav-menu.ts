import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
  selector: 'mh-nav-menu',
  host: {
    '[attr.multiple]': 'multiple() ? "" : null',
  },
})
export class NavMenu {
  readonly multiple = input(false, { transform: booleanAttribute });
}
