import '@smals-belgium-shared/vitals/callout';

import { Callout } from './callout';
import { CalloutClose } from './callout-close';
import { CalloutSlot } from './callout-slot';
import { ExpandableCallout } from './expandable-callout';

export * from './callout';
export * from './callout-close';
export * from './callout-slot';
export * from './expandable-callout';

export const CALLOUT = [Callout, CalloutClose, CalloutSlot, ExpandableCallout];
