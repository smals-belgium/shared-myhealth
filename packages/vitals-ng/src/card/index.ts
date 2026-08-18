import '@smals-belgium-shared/vitals/card';

import { NgModule } from '@angular/core';

import { Card } from './card';
import { CardSlot } from './card-slot';

export * from './card';
export * from './card-slot';

@NgModule({
  imports: [Card, CardSlot],
  exports: [Card, CardSlot],
})
export class CARD {}
