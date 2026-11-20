import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { slotContentDirective } from '../core/directive/slot-content.directive';

import groupStyles from './nav-group.css?inline';
import { NavItemsController } from './nav-items.controller';
import listStyles from './nav-list.css?inline';

/**
 * @summary Only intended for use as a child of `mh-nav-*` components. Creates a navigation subgroup without
 * creating a new semantic `nav` (which would be confusing for screen readers). It can optionally display a header
 * describing the group.
 * @documentation https://smals-belgium.github.io/shared-myhealth/components/nav-group
 * @status stable
 * @since 1.0
 *
 * @slot - Contains a list of navigation elements (links or buttons).
 * Technically there is no default slot, and behind the scenes the component creates a series of `nav-item-*` slots,
 * but you use it as if it were a regular default slot.
 * @slot header - Optional heading describing the group. Project heading elements here.
 */
@customElement('mh-nav-group')
export class NavGroup extends LitElement {
  static override readonly styles = [listStyles, groupStyles].map(unsafeCSS);

  readonly #items = new NavItemsController(this);

  override render() {
    return html`
      <slot
        name="header"
        part="header"
        @slotchange=${slotContentDirective}
      >
      </slot>

      <ul part="list">
        ${this.#items.render()}
      </ul>
    `;
  }
}
