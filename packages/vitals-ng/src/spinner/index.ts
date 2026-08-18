import '@smals-belgium-shared/vitals/spinner';

import { NgModule } from '@angular/core';

import { Spinner } from './spinner';

export * from './spinner';

@NgModule({
  imports: [Spinner],
  exports: [Spinner],
})
export class SPINNER {}
