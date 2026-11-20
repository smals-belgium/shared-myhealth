import { consume } from '@lit/context';
import { LitElement, adoptStyles, html, nothing, unsafeCSS } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { slotContentDirective } from '../core/directive/slot-content.directive';

import { navGroupRendererContext } from './nav-group.context';
import groupStyles from './nav-group.css?inline';
import type { NavGroupRenderer } from './nav-group.renderer';
import { NavItemsController } from './nav-items.controller';
import { listGroupRenderer } from './nav-list-group.renderer';
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

  /** The parent decides how the group renders. Without a parent that provides a renderer, it is a plain list. */
  @consume({ context: navGroupRendererContext, subscribe: true })
  @state()
  protected renderer: NavGroupRenderer = listGroupRenderer;

  readonly #items = new NavItemsController(
    this,
    el => this.renderer.renderItemContent?.(el) ?? nothing,
  );

  protected override willUpdate(changed: PropertyValues) {
    if (changed.has('renderer'))
      adoptStyles(this.renderRoot as ShadowRoot, [
        ...NavGroup.styles,
        ...(this.renderer.styles ?? []),
      ]);
  }

  override render() {
    return this.renderer.render({
      header: html`
        <slot
          name="header"
          part="header"
          @slotchange=${slotContentDirective}
        >
        </slot>
      `,
      items: this.#items.render(),
    });
  }
}
