import '@smals-belgium-shared/vitals/slide-toggle';

import { NgModule } from '@angular/core';

import { SlideToggle } from './slide-toggle';
import { SlideToggleRequiredValidator } from './slide-toggle-required.validator';
import { SlideToggleSlot } from './slide-toggle-slot';

export * from './slide-toggle';
export * from './slide-toggle-required.validator';
export * from './slide-toggle-slot';

@NgModule({
  imports: [SlideToggle, SlideToggleSlot, SlideToggleRequiredValidator],
  exports: [SlideToggle, SlideToggleSlot, SlideToggleRequiredValidator],
})
export class SLIDE_TOGGLE {}
