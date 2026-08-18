import '@smals-belgium-shared/vitals/skeleton';

import { NgModule } from '@angular/core';

import { Skeleton } from './skeleton';

export * from './skeleton';

@NgModule({
  imports: [Skeleton],
  exports: [Skeleton],
})
export class SKELETON {}
