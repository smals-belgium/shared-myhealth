import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './card.css?inline';
import appearance from './card.appearance.css?inline';

export type CardAppearance = 'raised' | 'outlined';

/**
 * @summary Cards group related content and actions inside a bordered container. Use them to present products, articles,
 *  user profiles, or any self-contained unit of information.
 * @documentation https://github.com/smals-belgium/myhealth-storybook-design-kit/docs/components/card
 * @status stable
 * @since 1.0
 *
 * @slot - The card's main content.
 * @slot header - An optional header for the card.
 * @slot footer - An optional footer for the card.
 * @slot header-actions - An optional actions section to render in the header of the vertical card.
 *
 * @csspart header - The container that wraps the card's header.
 * @csspart body - The container that wraps the card's main content.
 * @csspart footer - The container that wraps the card's footer.
 *
 * @cssproperty [--spacing=var(--mh-space-m)] - The amount of space around and between sections of the card.
 * Expects a single value.
 */
@customElement('mh-card')
export class Card extends LitElement {
  static override readonly styles = [styles, appearance].map(unsafeCSS);

  /** The card's visual appearance. */
  @property({ reflect: true })
  appearance: CardAppearance = 'raised';

  override render() {
    return html`<header part="header" role="presentation">
        <slot name="header-actions"></slot>
        <slot name="header"></slot>
      </header>
      <div part="body"><slot></slot></div>
      <footer part="footer" role="presentation">
        <slot name="footer"></slot>
      </footer>`;
  }
}
