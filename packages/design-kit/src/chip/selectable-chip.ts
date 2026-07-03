import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ChipBase } from './base';
import { ChipSelectionChangeEvent } from './chip-selection-change.event';
import styles from './chip.css?inline';
import selectableStyles from './selectable-chip.css?inline';

/**
 * @summary Selectable chips act as toggle buttons, typically used to filter content.
 * @documentation https://github.com/smals-belgium/myhealth-storybook-design-kit/docs/components/chip
 * @status stable
 * @since 1.0
 *
 * @dependency mh-icon
 *
 * @event mh-chip-selection-change - Emitted when the chip is selected or deselected.
 *
 * @slot - The chip's label.
 * @slot start - An element, such as `<mh-icon>`, placed before the label.
 *
 * @csspart base - The component's base wrapper (`<button>`).
 * @csspart start - The container that wraps the `start` slot.
 * @csspart main - The container that wraps the label.
 * @csspart checkmark - The leading checkmark shown when the chip is selected.
 *
 * @cssproperty [--mh-chip__height=2rem] - The chip's minimum height.
 */
@customElement('mh-selectable-chip')
export class SelectableChip extends ChipBase {
  static override readonly styles = [styles, selectableStyles].map(unsafeCSS);

  /** Whether the chip is selected. */
  @property({ type: Boolean, reflect: true }) selected = false;

  #onClick = () => {
    this.selected = !this.selected;
    this.dispatchEvent(new ChipSelectionChangeEvent(this.selected));
  };

  override render() {
    return html`
      <button
        part="base"
        type="button"
        aria-pressed=${this.selected ? 'true' : 'false'}
        ?disabled=${this.disabled}
        @click=${this.#onClick}
      >
        <mh-icon
          part="checkmark"
          name="check"
        ></mh-icon>
        <slot
          name="start"
          part="start"
        ></slot>
        <slot part="main"></slot>
      </button>
    `;
  }
}
