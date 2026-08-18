import '@smals-belgium-shared/vitals/dialog';

import { Dialog } from './dialog';
import { DialogClose } from './dialog-close';
import { DialogSlot } from './dialog-slot';

export * from './dialog';
export * from './dialog-close';
export * from './dialog-config';
export * from './dialog-ref';
export * from './dialog-slot';
export type { AfterClosed } from './dialog-result-store.ts';
export * from './dialog.service';
export * from './inputs';

export const DIALOG = [Dialog, DialogClose, DialogSlot];
