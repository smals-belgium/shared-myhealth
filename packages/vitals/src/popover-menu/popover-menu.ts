import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { openCloseController } from '../core/controller/open-close.controller';
import { ErrorEvent } from '../core/event/error.event';

import styles from './popover-menu.css?inline';
import placement from './popover-menu.placement.css?inline';

export type PopoverPosition = 'above' | 'below';
export type PopoverAlignment = 'start' | 'center' | 'end';

/**
 * @summary A floating panel containing a list of options.
 * The trigger that opens the panel can be any element of your choosing so long as it supports
 * [popovertarget](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#popovertarget).
 * The floating panel itself can contain actionable items such as buttons and links, but has no selection state and
 * can not be bound to a form.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using
 *
 * @documentation https://smals-belgium.github.io/shared-myhealth/components/popover-menu
 * @status stable
 * @since 1.0
 *
 * @slot - Default slot contains a list of button and/or link elements.
 *
 * @event toggle - https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using#the_beforetoggle_and_toggle_events
 * @event beforetoggle - https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using#the_beforetoggle_and_toggle_events
 *
 * @cssstate open - Applied when the menu is displayed
 *
 * @csspropery --mh-popover-menu__size-border-radius - The corner radius of the panel and of each projected menu item.
 * @csspropery --mh-popover-menu__box-shadow - The shadow of the floating panel.
 *
 * @csspropery --mh-popover-menu-item__color-fill - The background colour of each projected menu item.
 * @csspropery --mh-popover-menu-item__color-fill__hover - The hover colour of each projected menu item.
 * @csspropery --mh-popover-menu-item__color-fill__selected - The selection colour of each projected menu item.
 * @csspropery --mh-popover-menu-item__color-type - The text colour of each projected menu item.
 */
@customElement('mh-popover-menu')
export class PopoverMenu extends LitElement {
  static override readonly styles = [styles, placement].map(unsafeCSS);

  @property({ reflect: true }) position: PopoverPosition = 'below';
  @property({ reflect: true }) align: PopoverAlignment = 'start';
  @property({ type: Boolean, reflect: true }) open = false;

  readonly toggle = (force?: boolean) => (this.open = force ?? !this.open);
  readonly #close = () => (this.open = false);

  readonly #root = () => this.getRootNode() as Document | ShadowRoot;
  readonly #menuItems = () => this.querySelectorAll('*');

  override connectedCallback(): void {
    super.connectedCallback();

    this.addController(openCloseController(this));
    this.addEventListener('click', this.#close);

    this.setAttribute('popover', 'auto');
    this.setAttribute('role', 'menu');

    const triggers = this.#root().querySelectorAll(
      `[popovertarget="${this.id}"]`,
    );
    if (triggers.length === 0)
      this.dispatchEvent(
        new ErrorEvent(`No triggers linked to the popover-menu('${this.id}')`),
      );
    triggers.forEach(trigger => trigger.setAttribute('aria-haspopup', 'menu'));
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#close);
  }

  #initMenuItems() {
    this.#menuItems().forEach(item => item.setAttribute('role', 'menuitem'));
  }

  protected override render() {
    return html`<slot @slotchange=${this.#initMenuItems}></slot>`;
  }
}
