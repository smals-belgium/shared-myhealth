import '@smals-belgium-shared/vitals/slide-toggle';

import { SlideToggle } from './slide-toggle';
import { SlideToggleRequiredValidator } from './slide-toggle-required.validator';

export * from './slide-toggle';
export * from './slide-toggle-required.validator';

export const SLIDE_TOGGLE = [SlideToggle, SlideToggleRequiredValidator];
