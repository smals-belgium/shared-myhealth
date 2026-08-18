import '@smals-belgium-shared/vitals/icon';

import { NgModule } from '@angular/core';

import { Icon } from './icon';

export * from './icon';

@NgModule({
  imports: [Icon],
  exports: [Icon],
})
export class ICON {}
