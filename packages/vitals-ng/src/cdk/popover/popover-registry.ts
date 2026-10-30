import { Injectable } from '@angular/core';

import { Popover } from './popover';

/**
 * A simple map between `Popover` references and their generated HTML IDs.
 * When a Popover is created, it's add here, and when it's destroyed, it's removed again.
 * The purpose is to use Angular references when the underlying Lit component works with plain HTML IDs.
 */
@Injectable({ providedIn: 'root' })
export class PopoverRegistry extends WeakMap<Popover, string> {}
