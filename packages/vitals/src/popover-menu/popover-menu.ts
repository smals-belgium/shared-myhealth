import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { openCloseController } from '../core/controller/open-close.controller';

import { focusController } from './focus.controller';
import { keyboardController } from './keyboard.controller';
import { labelController } from './label.controller';
import { initMenuItems } from './menu-items';
import { initTriggers } from './popover-menu-triggers';
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

  /** The accessible name of the menu, for example "Actions for John Smith". Required. */
  @property() label = '';

  /** The vertical position of the popover with regards to its trigger: above or below. */
  @property({ reflect: true }) position: PopoverPosition = 'below';

  /**
   * The horizontal alignment of the popover with regards to its trigger: start, center or end.
   * Because the width of a menu is dynamic based on the contents, we only need one horizontal anchor point.
   */
  @property({ reflect: true }) align: PopoverAlignment = 'start';

  /** Whether the popover is currently visible. */
  @property({ type: Boolean, reflect: true }) open = false;

  readonly toggle = (force?: boolean) => (this.open = force ?? !this.open);
  readonly #close = () => (this.open = false);

  override connectedCallback(): void {
    super.connectedCallback();

    // Fallback focus target for a menu without enabled items
    this.setAttribute('tabindex', '-1');
    this.setAttribute('popover', 'auto');
    this.setAttribute('role', 'menu');

    const anchor = initTriggers(this);

    // Order matters: open-close before focus because a hidden popover cannot take focus
    this.addController(openCloseController(this, anchor));
    this.addController(focusController(this));
    this.addController(keyboardController(this));
    this.addController(labelController(this));
    this.addEventListener('click', this.#close);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#close);
  }

  protected override render() {
    return html`<slot @slotchange=${initMenuItems(this)}></slot>`;
  }
}
