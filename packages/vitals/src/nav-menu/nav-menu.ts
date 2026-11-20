import { provide } from '@lit/context';
import { LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { navGroupRendererContext } from '../nav-list/nav-group.context';
import { NavItemsController } from '../nav-list/nav-items.controller';
import { NavList } from '../nav-list/nav-list';

import { menuGroupRenderer } from './nav-menu-group.renderer';
import appearance from './nav-menu.css?inline';

/**
 * @summary A navigation list. The component takes care of the correct navigation and list semantics. As a developer,
 * you just need to provide links or buttons.
 * Like the native `optgroup` element, you can use `mh-nav-group` to create navigation subgroups.
 * The difference with `nav-list` is that the menu contains expandable/collapsible subgroups.
 * @documentation https://smals-belgium.github.io/shared-myhealth/components/nav-menu
 * @status stable
 * @since 1.0
 *
 * @dependency mh-icon
 * @dependency mh-nav-group
 * @dependency mh-nav-list
 *
 * @slot - Contains a list of navigation elements (links or buttons).
 * Technically there is no default slot, and behind the scenes the component creates a series of `nav-item-*` slots,
 * but you use it as if it were a regular default slot.
 */
@customElement('mh-nav-menu')
export class NavMenu extends LitElement {
  static override readonly styles = [...NavList.styles, unsafeCSS(appearance)];

  @provide({ context: navGroupRendererContext })
  protected readonly groupRenderer = menuGroupRenderer;

  readonly #items = new NavItemsController(this);

  override render() {
    return NavList.render(this.#items);
  }
}
