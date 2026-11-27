import { NgModule } from '@angular/core';

import '@smals-belgium-shared/vitals/nav-menu';
import { NavGroup } from '@smals-belgium-shared/vitals-ng/nav-list';

import { NavMenu } from './nav-menu';

export * from './nav-menu';

@NgModule({
  imports: [NavGroup, NavMenu],
  exports: [NavGroup, NavMenu],
})
export class NAV_MENU {}
