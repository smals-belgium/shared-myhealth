import { LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { cssStateReflect } from '../core/css';

import styles from './option.css?inline';

/**
 * @documentation https://github.com/smals-belgium/myhealth-storybook-design-kit/docs/components/option
 * @status stable
 * @since 1.0
 */
@customElement('mh-option')
export class Option extends LitElement {
  static override readonly styles = unsafeCSS(styles);

  /**
   * The option's value. When selected, the containing form control will receive this value. The value must be unique
   * from other options in the same group. Values may not contain spaces, as spaces are used as delimiters when listing
   * multiple values.
   */
  @property({ reflect: true }) value = '';

  /** Draws the option in a disabled state, preventing selection. */
  @property({ type: Boolean }) disabled = false;

  @property({ type: Boolean }) selected = false;

  override connectedCallback() {
    super.connectedCallback();
    this.addController(cssStateReflect(this, ['disabled', 'selected']));
    this.setAttribute('role', 'option');
  }

  override render() {
    return html`
      <slot
        part="start"
        name="start"
      ></slot>
      <slot part="label"></slot>
      <slot
        part="end"
        name="end"
      ></slot>
    `;
  }
}
