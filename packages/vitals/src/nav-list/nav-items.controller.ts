import { html, nothing } from 'lit';
import type { ReactiveController, ReactiveControllerHost } from 'lit';

const SLOT_PREFIX = 'nav-item-';

const slotName = (index: number) => `${SLOT_PREFIX}${String(index)}`;

/**
 * Track only:
 * - child add/remove or
 * - `disabled` attribute change on an existing child
 * ignore other subtree changes
 */
const isRelevant =
  (host: HTMLElement) =>
  ({ type, target }: MutationRecord) =>
    type === 'childList' ? target === host : target.parentNode === host;

/**
 * Gives every direct child of the host its own named slot, so that the host can render each one inside its own `<li>`
 * while the children themselves stay in the light DOM (and remain styleable by the consumer).
 * Children that are explicitly slotted elsewhere (e.g. `slot="header"`) are left alone.
 */
export class NavItemsController implements ReactiveController {
  readonly #host: ReactiveControllerHost & HTMLElement;
  readonly #observer = new MutationObserver(records => {
    if (records.some(isRelevant(this.#host))) this.#sync();
  });

  #items: Element[] = [];

  constructor(host: ReactiveControllerHost & HTMLElement) {
    this.#host = host;
    host.addController(this);
  }

  hostConnected() {
    this.#observer.observe(this.#host, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled'],
    });
    this.#sync();
  }

  hostDisconnected() {
    this.#observer.disconnect();
  }

  #sync() {
    this.#items = [...this.#host.children].filter(
      el => !el.hasAttribute('slot') || el.slot.startsWith(SLOT_PREFIX),
    );
    this.#items.forEach((el, index) => {
      const name = slotName(index);
      if (el.slot !== name) el.slot = name;
    });
    this.#host.requestUpdate();
  }

  render() {
    return this.#items.map(
      (el, index) => html`
        <li
          part="list-item"
          ?data-has-disabled=${el.hasAttribute('disabled')}
        >
          <slot name=${slotName(index)}></slot>
          ${
            el.localName === 'mh-nav-group'
              ? nothing
              : html`<mh-icon
                  part="icon"
                  name="chevron_right"
                >
                </mh-icon>`
          }
        </li>
      `,
    );
  }
}
