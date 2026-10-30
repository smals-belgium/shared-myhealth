import '@smals-belgium-shared/vitals/popover-menu';

import { NgModule } from '@angular/core';

import { Popover } from './popover';
import { PopoverMenu } from './popover-menu';
import { PopoverTarget } from './popover-target';

export * from './popover';
export * from './popover-menu';
export * from './popover-target';

@NgModule({
  imports: [Popover, PopoverMenu, PopoverTarget],
  exports: [Popover, PopoverMenu, PopoverTarget],
})
export class POPOVER_MENU {}
