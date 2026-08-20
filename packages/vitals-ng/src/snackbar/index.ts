import '@smals-belgium-shared/vitals/snackbar';

import { NgModule } from '@angular/core';

import { Snackbar } from './snackbar';

export * from './snackbar';
export * from './snackbar-config';
export * from './snackbar-ref';
export * from './snackbar.service';

@NgModule({
  imports: [Snackbar],
  exports: [Snackbar],
})
export class SNACKBAR {}
