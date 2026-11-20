import '@smals-belgium-shared/vitals/nav-list';

import { NgModule } from '@angular/core';

import { NavGroup } from './nav-group';
import { NavList } from './nav-list';

export * from './nav-group';
export * from './nav-list';

@NgModule({
  imports: [NavGroup, NavList],
  exports: [NavGroup, NavList],
})
export class NAV_LIST {}
