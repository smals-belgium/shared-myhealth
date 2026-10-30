import { Directive, input } from '@angular/core';

import type {
  PopoverAlignment,
  PopoverPosition,
} from '@smals-belgium-shared/vitals/popover-menu';

import { Popover } from './popover';

@Directive({
  selector: 'mh-popover-menu',
  hostDirectives: [Popover],
  host: {
    '[attr.position]': 'position()',
    '[attr.alignment]': 'alignment()',
  },
})
export class PopoverMenu {
  readonly position = input<PopoverPosition>('below');
  readonly alignment = input<PopoverAlignment>('start');
}
