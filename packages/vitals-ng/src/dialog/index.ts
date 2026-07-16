import '@smals-belgium-shared/vitals/dialog';

import { Dialog } from './dialog';
import { DialogClose } from './dialog-close';

export * from './dialog';
export * from './dialog-close';
export * from './dialog-config';
export * from './dialog-ref';
export type { AfterClosed } from './dialog-result-store.ts';
export * from './dialog.service';
export * from './inputs';

export const DIALOG = [Dialog, DialogClose];
