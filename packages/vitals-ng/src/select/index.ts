import '@smals-belgium-shared/vitals/select';

import { NgModule } from '@angular/core';

import { Option } from './option';
import { OptionSlot } from './option-slot';
import { Select } from './select';
import { SelectSlot } from './select-slot';

export * from './option';
export * from './option-slot';
export * from './select';
export * from './select-slot';

@NgModule({
  imports: [Option, OptionSlot, Select, SelectSlot],
  exports: [Option, OptionSlot, Select, SelectSlot],
})
export class SELECT {}
