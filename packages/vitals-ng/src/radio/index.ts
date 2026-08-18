import '@smals-belgium-shared/vitals/radio';

import { NgModule } from '@angular/core';

import { Radio } from './radio';

export * from './radio';

@NgModule({
  imports: [Radio],
  exports: [Radio],
})
export class RADIO {}
