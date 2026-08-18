import '@smals-belgium-shared/vitals/icon-button';

import { NgModule } from '@angular/core';

import { IconButton } from './icon-button';

export * from './icon-button';

@NgModule({
  imports: [IconButton],
  exports: [IconButton],
})
export class ICON_BUTTON {}
