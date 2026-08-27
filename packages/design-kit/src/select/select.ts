import { LitElement, PropertyValueMap, html, unsafeCSS } from 'lit';
import { customElement, property, query, queryAll } from 'lit/decorators.js';

import type { Size } from '../core';
import { cssStateReflect, cssStates } from '../core/css';
import { childEventDirective } from '../core/directive';
import { getInternals } from '../core/internals';
import { openCloseBehaviour } from '../core/open-close.behaviour';
import size from '../form-control/form-control.size.css?inline';
import { renderFormField } from '../form-control/form-field';
import formField from '../form-control/form-field.css?inline';

import type { Option } from './option';
import styles from './select.css?inline';

export type SelectSize = Extract<Size, 's' | 'm'>;

/**
 * @summary Selects let users choose one or more values from a dropdown list of predefined options. Use them in forms
 * when a fixed set of choices needs to fit in limited space.
 * @documentation https://github.com/smals-belgium/myhealth-storybook-design-kit/docs/components/select
 * @status stable
 * @since 1.0
 *
 * @dependency mh-icon
 *
 * @slot - Default slot contains a list of `mh-option`s. If it also contains plain text, this will be moved to the
 * label slot. If you need a more complex label, use the `label` slot instead.
 * @slot start - An element, such as `<mh-icon>`, placed before the toggle-button label.
 * @slot end - An element, such as `<mh-icon>`, placed after the toggle-button label.
 * @slot label - The form-field input label.
 * @slot help - The form-field help label.
 * @slot hint - The form-field hint label.
 *
 * @event blur - Emitted when the control loses focus.
 * @event focus - Emitted when the contGol gains focus.
 *
 * @csspart base - The native `label` that wraps the `select`.
 * @csspart label - The actual label content.
 * @csspart help - The actual help description content.
 * @csspart hint - The actual hint description content.
 * @csspart toggle-button - The button you click to open the dropdown.
 * @csspart start - Left side of the toggle button.
 * @csspart selected-label - The label displayed in the toggle-button; either a placeholder or an actual value label.
 * @csspart end - Right side of the toggle button.
 * @csspart listbox - The box with a list of `mh-option`s that is displayed when the toggle-button is clicked.
 *
 * @cssstate placeholder-shown - Applied when the component has no selected value.
 * @cssstate open - Applied when the popover is displayed.
 * @cssstate required - Applied when the control is required.
 * @cssstate disabled - Applied when the control is disabled.
 * @cssstate invalid - Applied when the control is invalid.
 *
 * @cssproperty [--mh-select__color-chevron=var(--mh-color-brand-type)] - The color of the dropdown chevron icon.
 * @cssproperty [--mh-select__color-border-input=var(--mh-color-neutral-border)] - The border color of the select button.
 * @cssproperty [--mh-select__color-border-input__hover=var(--mh-color-brand-border)] - The border color on hover.
 * @cssproperty [--mh-select__color-border-input__focus=var(--mh-color-brand-border-loud)] - The border color when focused.
 * @cssproperty [--mh-select__color-border-input__invalid=var(--mh-color-danger-border)] - The border color when invalid.
 * @cssproperty --mh-select__color-border-input__invalid-hover - The border color when invalid and hovered.
 * @cssproperty --mh-select__color-fill-input - The background color of the select button.
 * @cssproperty [--mh-select__box-shadow-listbox=0px 3px 10px 0px rgba(0,0,0,0.15)] - The shadow of the dropdown listbox.
 * @cssproperty [--mh-select__size-height=var(--mh-form-control-height)] - The height of the select button.
 * @cssproperty [--mh-select__size-border-radius=var(--mh-border-radius)] - The border radius of the select button.
 *
 * @cssproperty [--mh-form-field__color-type-label=var(--mh-color-neutral-type-louder)] - The color of the field label.
 * @cssproperty [--mh-form-field__color-type-help=var(--mh-color-neutral-type-loud)] - The color of the help text.
 * @cssproperty [--mh-form-field__color-type-hint=var(--mh-color-neutral-type)] - The color of the hint text.
 * @cssproperty [--mh-form-field__color-type-required-symbol=var(--mh-color-danger-type)] - The color of the required `*` symbol.
 * @cssproperty [--mh-form-field__color-type__disabled=var(--mh-color-neutral-type)] - The label and hint color when disabled.
 */
@customElement('mh-select')
export class Select extends LitElement {
  static override readonly styles = [formField, styles, size].map(unsafeCSS);
  static formAssociated = true;
  readonly internals = getInternals(this);
  readonly #states = cssStates<'placeholder-shown'>(this);

  @query('[part="toggle-button"]') el?: HTMLInputElement;
  @query('[part="label"]') label?: HTMLElement;
  @query('[part="listbox"]') listbox?: HTMLElement;
  @queryAll('slot') slots?: NodeListOf<HTMLSlotElement>;

  @property() override title = '';

  @property({ reflect: true }) size: SelectSize = 'm';

  @property({ reflect: true }) name?: string;
  @property({ reflect: true }) value?: string | null;

  @property({ reflect: true }) placeholder?: string;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;

  @property({ reflect: true }) help?: string;
  @property({ reflect: true }) hint?: string;

  /**
   * Indicates whether or not the select is open. You can toggle this attribute to show and hide the menu, or you can
   * use the `toggle()` method and this attribute will reflect the select's open state.
   */
  @property({ type: Boolean, reflect: true }) open = false;

  // TBD
  multiple = false;

  #getOption = (selector: string) =>
    this.querySelector<Option>(`mh-option${selector}`);

  get #selectedOption() {
    return this.#getOption('[selected]');
  }

  #selectOption(value?: string | null) {
    this.#selectedOption?.removeAttribute('selected');
    if (value)
      this.#getOption(`[value="${value}"]`)?.setAttribute('selected', '');
  }

  get #selectedLabel() {
    return this.#selectedOption?.innerText ?? this.placeholder ?? '';
  }

  #openClose = openCloseBehaviour(this);

  /** Programmatically open or close the select's listbox. */
  readonly toggle = this.#openClose.toggle;

  // Captures the HTML-declared defaults once; used to restore state on form reset.
  #defaultValue: string | null | undefined;

  override readonly click = () => this.el?.click();
  override readonly focus = () => this.el?.focus();
  override readonly blur = () => this.el?.blur();

  override connectedCallback() {
    super.connectedCallback();
    this.addController(cssStateReflect(this, ['disabled', 'open', 'required']));
    this.#states.set('placeholder-shown', !this.value);
    this.internals.role = 'combobox';
  }

  formResetCallback() {
    this.value = this.#defaultValue ?? null;
  }

  override update(changed: PropertyValueMap<this>) {
    if (changed.has('value')) this.#selectOption(this.value);
    super.update(changed);
  }

  override updated(changed: PropertyValueMap<this>) {
    if (changed.has('value')) {
      this.internals.setFormValue(this.value ?? null);
      this.#states.set('placeholder-shown', !this.value);
    }

    if (changed.has('open')) this.listbox?.togglePopover(this.open);
  }

  #handleDefaultSlotChange() {
    this.value = this.#selectedOption?.value;
    this.#defaultValue ??= this.value;

    const textNodes = Array.from(this.childNodes).filter(
      node => node.nodeType === Node.TEXT_NODE,
    );

    const labelText = textNodes
      .map(node => node.textContent?.trim())
      .join('')
      .trim();

    if (this.label && labelText) {
      this.label.innerText = labelText;
      textNodes.forEach(node => node.remove());
    }
  }

  #onOptionClick = childEventDirective({
    name: 'mh-option',
    onEvent: ({ value }) => {
      this.value = value;
      this.open = false;
      this.dispatchEvent(new Event('change', { bubbles: true }));
    },
  });

  #renderToggleButton = () => html`
    <button
      required
      part="toggle-button"
      popovertarget="listbox"
      ?disabled=${this.disabled}
    >
      <slot
        name="start"
        part="start"
      ></slot>

      <span part="selected-label">${this.#selectedLabel}</span>

      <slot
        name="end"
        part="end"
      ></slot>

      <mh-icon name="chevron_right"></mh-icon>
    </button>
  `;

  #renderListbox = () => html`
    <div
      id="listbox"
      part="listbox"
      role="listbox"
      popover
      aria-expanded=${this.open ? 'true' : 'false'}
      aria-multiselectable=${this.multiple ? 'true' : 'false'}
      aria-labelledby="label"
      tabindex="-1"
      @mouseup=${this.#onOptionClick}
      @toggle=${this.#openClose.onToggle}
    >
      <slot @slotchange=${this.#handleDefaultSlotChange}></slot>
    </div>
  `;

  override render() {
    return renderFormField({
      host: this,
      renderInput: this.#renderToggleButton,
      renderExtra: this.#renderListbox,
    });
  }
}
