import { Directive, input } from '@angular/core';

import type {
  PopoverAlignment,
  PopoverPosition,
} from '@smals-belgium-shared/vitals/popover-menu';
import { Popover } from '@smals-belgium-shared/vitals-ng/cdk/popover';

/**
 * @summary Angular wrapper for the `mh-popover-menu` Lit component.
 * @see PopoverMenu
 *
 * @documentation https://smals-belgium.github.io/shared-myhealth/components/popover-menu
 * @status stable
 * @since 1.0
 *
 * Shared popover bindings are implemented in the `Popover` host directive.
 * @see Popover
 */
@Directive({
  selector: 'mh-popover-menu',
  hostDirectives: [Popover],
  host: {
    '[attr.position]': 'position()',
    '[attr.align]': 'align()',
  },
})
export class PopoverMenu {
  readonly position = input<PopoverPosition>('below');
  readonly align = input<PopoverAlignment>('start');
}
