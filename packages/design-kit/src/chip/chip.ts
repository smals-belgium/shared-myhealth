import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { Variant } from '../core';

import displayStyles from './chip.appearance.css?inline';
import styles from './chip.css?inline';

/** The chip's theme variant. */
export type ChipVariant = Variant | 'tertiary';

/**
 * @summary Display chips are compact, non-actionable labels that communicate a status or category.
 * @documentation https://github.com/smals-belgium/myhealth-storybook-design-kit/docs/components/chip
 * @status stable
 * @since 1.0
 *
 * @slot - The chip's label.
 * @slot start - An element, such as `<mh-icon>`, placed before the label.
 *
 * @csspart base - The component's base wrapper (`<span>`).
 * @csspart start - The container that wraps the `start` slot.
 * @csspart main - The container that wraps the label.
 *
 * @cssproperty [--mh-chip__height=2rem] - The chip's minimum height.
 */
@customElement('mh-chip')
export class Chip extends LitElement {
  static override readonly styles = [styles, displayStyles].map(unsafeCSS);

  /** The chip's theme variant. */
  @property({ reflect: true }) variant: ChipVariant = 'neutral';

  override render() {
    return html`
      <span part="base">
        <slot
          name="start"
          part="start"
        ></slot>
        <slot part="main"></slot>
      </span>
    `;
  }
}
