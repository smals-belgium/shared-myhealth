import '@smals-belgium-shared/vitals/popover-menu';

import { NgModule } from '@angular/core';

import {
  Popover,
  PopoverTarget,
} from '@smals-belgium-shared/vitals-ng/cdk/popover';

import { PopoverMenu } from './popover-menu';

export * from './popover-menu';

@NgModule({
  imports: [Popover, PopoverMenu, PopoverTarget],
  exports: [Popover, PopoverMenu, PopoverTarget],
})
export class POPOVER_MENU {}
