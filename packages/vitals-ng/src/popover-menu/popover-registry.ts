import { Injectable } from '@angular/core';

import { Popover } from './popover';

@Injectable({ providedIn: 'root' })
export class PopoverRegistry extends WeakMap<Popover, string> {}
