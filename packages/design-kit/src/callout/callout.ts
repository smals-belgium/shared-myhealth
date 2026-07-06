import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { LocalizeController } from '../core/i18n';

import { CalloutBase } from './base';
import { CalloutClosedEvent } from './callout-closed.event';

/**
 * @summary Callouts are inline banners that communicate a contextual status or message. They show a fixed icon for
 *  their variant, a title, an optional description, optional actions, and a close button. The content region is
 *  announced to screen readers as a status message (polite) for info/success/neutral/brand variants, or as an alert
 *  (assertive) for danger/warning variants.
 * @documentation https://github.com/smals-belgium/myhealth-storybook-design-kit/docs/components/callout
 * @status stable
 * @since 1.0
 *
 * @dependency mh-icon
 * @dependency mh-icon-button
 *
 * @event mh-callout-closed - Emitted after the close button is activated and the callout removes itself.
 *
 * @slot title - The callout's title, shown next to the icon.
 * @slot description - The callout's descriptive content, shown below the title.
 * @slot actions - The callout's actions, typically buttons.
 *
 * @csspart icon - The variant icon at the start of the callout.
 * @csspart header - The top row that wraps the icon, title, and close button.
 * @csspart title - The container for the `title` slot.
 * @csspart close - The close (`X`) icon button.
 * @csspart region - The region that wraps the description and actions. Has role="status" or role="alert" based on variant.
 * @csspart content - The inner wrapper that holds the description and actions.
 * @csspart description - The container for the `description` slot.
 * @csspart actions - The container that wraps the `actions` slot.
 *
 * @cssproperty [--mh-callout__spacing=var(--mh-space-m)] - The amount of space around and between sections of the callout.
 */
@customElement('mh-callout')
export class Callout extends CalloutBase {
  private readonly localize = new LocalizeController(this);

  #onCloseClick = () => {
    this.dispatchEvent(new CalloutClosedEvent());
    this.remove();
  };

  override render() {
    return html`
      <div part="header">
        ${this.renderIcon()}
        <div
          part="title"
          id="title"
        >
          <slot name="title"></slot>
        </div>
        <mh-icon-button
          part="close"
          name="close"
          label=${this.localize.term('close')}
          @click=${this.#onCloseClick}
        ></mh-icon-button>
      </div>

      <div
        part="region"
        role=${this.getContentRole()}
        aria-labelledby="title"
        aria-live=${this.getContentRole() === 'alert' ? 'assertive' : 'polite'}
      >
        <div part="content">
          <slot
            name="description"
            part="description"
          ></slot>
          <div part="actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
    `;
  }
}
