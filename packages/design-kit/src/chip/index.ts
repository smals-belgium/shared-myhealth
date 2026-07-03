import type { DisplayChip } from './display-chip';
import type { RemovableChip } from './removable-chip';
import type { SelectableChip } from './selectable-chip';

export * from './chip-remove.event';
export * from './chip-selection-change.event';
export * from './display-chip';
export * from './removable-chip';
export * from './selectable-chip';

declare global {
  interface HTMLElementTagNameMap {
    'mh-display-chip': DisplayChip;
    'mh-removable-chip': RemovableChip;
    'mh-selectable-chip': SelectableChip;
  }
}
