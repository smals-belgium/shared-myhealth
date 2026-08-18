import '@smals-belgium-shared/vitals/slide-toggle';

import { SlideToggle } from './slide-toggle';
import { SlideToggleRequiredValidator } from './slide-toggle-required.validator';
import { SlideToggleSlot } from './slide-toggle-slot';

export * from './slide-toggle';
export * from './slide-toggle-required.validator';
export * from './slide-toggle-slot';

export const SLIDE_TOGGLE = [
  SlideToggle,
  SlideToggleSlot,
  SlideToggleRequiredValidator,
];
