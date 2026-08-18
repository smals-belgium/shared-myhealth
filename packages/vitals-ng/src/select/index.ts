import '@smals-belgium-shared/vitals/select';

import { Option } from './option';
import { OptionSlot } from './option-slot';
import { Select } from './select';
import { SelectSlot } from './select-slot';

export * from './option';
export * from './option-slot';
export * from './select';
export * from './select-slot';

export const SELECT = [Option, OptionSlot, Select, SelectSlot];
