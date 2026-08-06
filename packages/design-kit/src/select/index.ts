import type { Option } from './option';
import type { Select } from './select';

export * from './option';
export * from './select';

declare global {
  interface HTMLElementTagNameMap {
    'mh-option': Option;
    'mh-select': Select;
  }
}
