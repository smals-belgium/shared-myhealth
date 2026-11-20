import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { NavItemsController } from './nav-items.controller';
import appearance from './nav-list.appearance.css?inline';
import styles from './nav-list.css?inline';

export type NavListAppearance = 'outlined' | 'transparent';

/**
 * @summary A navigation list. The component takes care of the correct navigation and list semantics. As a develop,
 * you just need to provide links or buttons.
 * Like the native `optgroup` element, you can use `mh-nav-group` to create navigation subgroups.
 * @documentation https://smals-belgium.github.io/shared-myhealth/components/nav-list
 * @status stable
 * @since 1.0
 *
 * @dependency mh-icon
 * @dependency mh-nav-group
 *
 * @slot - Contains a list of navigation elements (links or buttons).
 * Technically there is no default slot, and behind the scenes the component creates a series of `nav-item-*` slots,
 * but you use it as if it were a regular default slot.
 */
@customElement('mh-nav-list')
export class NavList extends LitElement {
  static override readonly styles = [styles, appearance].map(unsafeCSS);

  @property({ reflect: true }) appearance: NavListAppearance = 'outlined';

  readonly #items = new NavItemsController(this);

  override render() {
    return html`
      <nav>
        <ul part="list">
          ${this.#items.render()}
        </ul>
      </nav>
    `;
  }
}
