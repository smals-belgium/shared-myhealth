import '@smals-belgium-shared/vitals/chip';

import { Chip } from './chip';
import { RemovableChip } from './removable-chip';
import { SelectableChip } from './selectable-chip';

export * from './chip';
export * from './removable-chip';
export * from './selectable-chip';

export const CHIP = [Chip, RemovableChip, SelectableChip];
