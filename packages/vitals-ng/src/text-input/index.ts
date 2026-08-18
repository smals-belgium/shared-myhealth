import '@smals-belgium-shared/vitals/text-input';

import { NgModule } from '@angular/core';

import { TextInput } from './text-input';
import { TextInputSlot } from './text-input-slot';

export * from './text-input';
export * from './text-input-slot';

@NgModule({
  imports: [TextInput, TextInputSlot],
  exports: [TextInput, TextInputSlot],
})
export class TEXT_INPUT {}
