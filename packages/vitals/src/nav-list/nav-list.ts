import { provide } from '@lit/context';
import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { renderChevron } from './chevron.renderer';
import { navGroupRendererContext } from './nav-group.context';
import { NavItemsController } from './nav-items.controller';
import { listGroupRenderer } from './nav-list-group.renderer';
import appearance from './nav-list.appearance.css?inline';
import styles from './nav-list.css?inline';

export type NavListAppearance = 'outlined' | 'transparent';

/**
 * @summary A navigation list. The component takes care of the correct navigation and list semantics. As a developer,
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

  /** Accessible name of the navigation landmark, e.g. to tell several navigations on the same page apart. */
  @property() label?: string;

  @provide({ context: navGroupRendererContext })
  protected readonly groupRenderer = listGroupRenderer;

  readonly #items = new NavItemsController(this, renderChevron);

  static render(items: NavItemsController, label?: string) {
    return html`
      <nav aria-label=${ifDefined(label)}>
        <ul part="list">
          ${items.render()}
        </ul>
      </nav>
    `;
  }

  override render() {
    return NavList.render(this.#items, this.label);
  }
}
