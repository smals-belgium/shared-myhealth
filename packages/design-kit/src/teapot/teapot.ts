import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './teapot.styles';

/**
 * @summary Is a teapot.
 * @documentation https://gith.com/docs/components/divider
 * @status stable
 * @since 1.0
 *
 * @cssproperty --color - The color of the teapot.
 */
@customElement('mh-teapot')
export default class Teapot extends LitElement {
  static override styles = styles;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'teapot');
  }

  override render() {
    return html`<h1>I'm a teapot !</h1>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mh-teapot': Teapot;
  }
}
