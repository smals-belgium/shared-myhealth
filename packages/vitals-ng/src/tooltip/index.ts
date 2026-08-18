import '@smals-belgium-shared/vitals/tooltip';

import { NgModule } from '@angular/core';

import { Tooltip } from './tooltip';
import { TooltipSlot } from './tooltip-slot';

export * from './tooltip';
export * from './tooltip-slot';

@NgModule({
  imports: [Tooltip, TooltipSlot],
  exports: [Tooltip, TooltipSlot],
})
export class TOOLTIP {}
