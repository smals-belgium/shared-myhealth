/* eslint-disable import/max-dependencies*/

import { Route } from '@angular/router';

import { ButtonComponent } from './button.component';
import { CheckboxComponent } from './checkbox.component';
import { DividerComponent } from './divider.component';
import { FormSandbox } from './form-sandbox';
import { HomeComponent } from './home.component';
import { IconButtonComponent } from './icon-button.component';
import { IconComponent } from './icon.component';
import { RadioComponent } from './radio.component';
import { SkeletonComponent } from './skeleton.component';
import { SlideToggleComponent } from './slide-toggle.component';
import { SpinnerComponent } from './spinner.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'button',
    component: ButtonComponent,
  },
  {
    path: 'checkbox',
    component: CheckboxComponent,
  },
  {
    path: 'divider',
    component: DividerComponent,
  },
  {
    path: 'form-sandbox',
    component: FormSandbox,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'icon',
    component: IconComponent,
  },
  {
    path: 'icon-button',
    component: IconButtonComponent,
  },
  {
    path: 'radio',
    component: RadioComponent,
  },
  {
    path: 'skeleton',
    component: SkeletonComponent,
  },
  {
    path: 'slide-toggle',
    component: SlideToggleComponent,
  },
  {
    path: 'spinner',
    component: SpinnerComponent,
  },
];
