import { LitElement, PropertyValueMap, html, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import styles from './slide-toggle.css?inline';

/**
 * Position of the slide toggle's label.
 */
export type LabelPosition = 'left' | 'right';

/**
 * @summary A slide toggle is a switch that allows users to toggle an option on or off.
 * @documentation https://github.com/smals-belgium/myhealth-storybook-design-kit/docs/components/slide-toggle
 * @status stable
 * @since 1.0
 *
 * @slot - The slide toggle's label.
 *
 * @event blur - Emitted when the control loses focus.
 * @event focus - Emitted when the control gains focus.
 * @event change - Emitted when the control's checked state changes.
 *
 * @csspart base - The native `label` that wraps the `input`.
 * @csspart label - The actual label content.
 * @csspart input - The native checkbox input.
 * @csspart track - The toggle track container.
 * @csspart thumb - The toggle thumb (sliding element).
 *
 * @cssstate checked - Applied when the control is checked.
 * @cssstate disabled - Applied when the control is disabled.
 * @cssstate invalid - Applied when the control is invalid.
 *
 * @attr label-position - Position of the label: "left" or "right" (default: "right").
 */
@customElement('mh-slide-toggle')
export class SlideToggle extends LitElement {
  static override readonly styles = unsafeCSS(styles);
  static formAssociated = true;
  readonly internals = this.attachInternals();

  @query('[part="input"]') el?: HTMLInputElement;

  @property() override title = '';

  @property({ reflect: true }) name?: string;
  @property({ reflect: true }) value?: string;

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ reflect: true, attribute: 'label-position' })
  labelPosition: LabelPosition = 'right';

  // Captures the HTML-declared defaults once; used to restore state on form reset.
  #defaultChecked: boolean | undefined;

  override readonly click = () => this.el?.click();
  override readonly focus = () => this.el?.focus();
  override readonly blur = () => this.el?.blur();

  override connectedCallback() {
    super.connectedCallback();
    this.#defaultChecked ??= this.checked;
    this.internals.role = 'switch';
  }

  formResetCallback() {
    this.checked = this.#defaultChecked ?? false;
    this.internals.setFormValue(this.checked ? (this.value ?? null) : null);
  }

  override updated(changed: PropertyValueMap<this>) {
    if (changed.has('checked') && this.checked)
      this.internals.setFormValue(this.value ?? null);
  }

  #onChange() {
    if (this.el) this.checked = this.el.checked;
    this.internals.setFormValue(this.checked ? (this.value ?? null) : null);
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  #getIcon() {
    if (this.disabled) return '';
    const iconName = this.checked ? 'check' : 'remove';
    return html`<mh-icon
      name=${iconName}
      aria-hidden="true"
    ></mh-icon>`;
  }

  override render() {
    return html`
      <label part="base">
        <input
          part="input"
          type="checkbox"
          title=${this.title}
          name=${ifDefined(this.name)}
          .value=${ifDefined(this.value)}
          .checked=${this.checked}
          .disabled=${this.disabled}
          .required=${this.required}
          aria-checked=${this.checked ? 'true' : 'false'}
          @change=${this.#onChange}
        />
        ${this.labelPosition === 'left' ? html`<slot part="label"></slot>` : ''}
        <span part="track">
          <span part="thumb">${this.#getIcon()}</span>
        </span>
        ${this.labelPosition === 'right'
          ? html`<slot part="label"></slot>`
          : ''}
      </label>
    `;
  }
}
