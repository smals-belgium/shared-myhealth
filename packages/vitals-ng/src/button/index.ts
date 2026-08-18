import '@smals-belgium-shared/vitals/button';

import { NgModule } from '@angular/core';

import { Anchor } from './anchor';
import { Button } from './button';
import { AnchorSlot, ButtonSlot } from './button-slot';

export * from './anchor';
export * from './button';
export * from './button-slot';

@NgModule({
  imports: [Anchor, AnchorSlot, Button, ButtonSlot],
  exports: [Anchor, AnchorSlot, Button, ButtonSlot],
})
export class BUTTON {}
