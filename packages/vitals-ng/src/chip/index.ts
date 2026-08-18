import '@smals-belgium-shared/vitals/chip';

import { Chip } from './chip';
import { ChipSlot } from './chip-slot';
import { RemovableChip } from './removable-chip';
import { SelectableChip } from './selectable-chip';

export * from './chip';
export * from './chip-slot';
export * from './removable-chip';
export * from './selectable-chip';

export const CHIP = [Chip, ChipSlot, RemovableChip, SelectableChip];
