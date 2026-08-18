import '@smals-belgium-shared/vitals/divider';

import { NgModule } from '@angular/core';

import { Divider } from './divider';

export * from './divider';

@NgModule({
  imports: [Divider],
  exports: [Divider],
})
export class DIVIDER {}
