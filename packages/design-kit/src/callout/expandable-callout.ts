import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { CalloutBase } from './base';
import expandable from './expandable-callout.css?inline';

export type ExpandableCalloutState = 'open' | 'closed';

/**
 * @summary Expandable callouts are inline banners that disclose their content on demand. Built on the native
 *  `<details>` element, they show a fixed icon for their variant, a title, and a chevron; activating the header
 *  expands or collapses the description and optional actions. The content region is announced to screen readers
 *  as a status message (polite) for info/success/neutral/brand variants, or as an alert (assertive) for
 *  danger/warning variants.
 * @documentation https://github.com/smals-belgium/myhealth-storybook-design-kit/docs/components/expandable-callout
 * @status stable
 * @since 1.0
 *
 * @dependency mh-icon
 *
 * @event toggle - Emitted when the callout is expanded or collapsed.
 * @event mh-callout-closed - Emitted when a `callout-close` button is activated and the callout removes itself.
 *
 * @slot - The callout's descriptive content, shown below the title when expanded.
 * @slot title - The callout's title, shown next to the icon. Activating it toggles the callout.
 * @slot actions - The callout's actions, typically buttons. Add the `callout-close` attribute to any element
 *  here to dismiss and remove the callout when it is activated.
 *
 * @csspart icon - The variant icon at the start of the callout.
 * @csspart header - The `<summary>` toggle that wraps the icon, title, and chevron.
 * @csspart title - The container for the `title` slot.
 * @csspart toggle - The chevron icon shown at the end of the header.
 * @csspart region - The collapsible region that wraps the description and actions. Has role="status" or role="alert" based on variant.
 * @csspart content - The inner wrapper that holds the description and actions.
 * @csspart description - The container for the `description` slot.
 * @csspart actions - The container that wraps the `actions` slot.
 *
 * @cssproperty [--mh-callout__spacing=var(--mh-space-m)] - The amount of space around and between sections of the callout.
 */
@customElement('mh-expandable-callout')
export class ExpandableCallout extends CalloutBase {
  static override readonly styles = [
    ...CalloutBase.styles,
    unsafeCSS(expandable),
  ];

  /** Whether the callout is expanded. Reflects as an attribute. */
  @property({ type: Boolean, reflect: true }) open = false;

  get #state(): ExpandableCalloutState {
    return this.open ? 'open' : 'closed';
  }

  /** Expands or collapses the callout. Pass `force` to set an explicit state. */
  toggle = (force?: boolean) => (this.open = force ?? !this.open);

  #onToggle = (event: ToggleEvent) => {
    this.open = event.newState === 'open';

    this.dispatchEvent(
      new ToggleEvent('toggle', {
        oldState: event.oldState,
        newState: this.#state,
      }),
    );
  };

  #onCloseTrigger = (event: MouseEvent) => {
    const trigger = event
      .composedPath()
      .find(
        (target): target is HTMLElement =>
          target instanceof HTMLElement &&
          target.hasAttribute('mh-callout-close'),
      );

    if (!trigger) return;

    this.dispatchEvent(new Event('close'));
    this.remove();
  };

  override render() {
    return html`
      <details
        ?open=${this.open}
        @toggle=${this.#onToggle}
      >
        <summary part="header">
          ${this.renderIcon()}
          <span
            part="title"
            id="title"
          >
            <slot name="title"></slot>
          </span>
          <mh-icon
            part="toggle"
            name="keyboard_arrow_down"
            aria-hidden="true"
          ></mh-icon>
        </summary>

        <div
          part="region"
          role=${this.getContentRole()}
          aria-labelledby="title"
          aria-live=${this.getContentRole() === 'alert'
            ? 'assertive'
            : 'polite'}
          @click=${this.#onCloseTrigger}
        >
          <div part="content">
            <slot part="description"></slot>
            <div part="actions">
              <slot name="actions"></slot>
            </div>
          </div>
        </div>
      </details>
    `;
  }
}
