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
 * @event focus - Emitted when the control gains focus.
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

  get #selectedOption() {
    return this.querySelector<Option>('mh-option[selected]');
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
    this.internals.setFormValue(this.value);
  }

  override updated(changed: PropertyValueMap<this>) {
    if (changed.has('value')) {
      this.internals.setFormValue(this.value ?? null);
      this.#states.set('placeholder-shown', !this.value);
    }

    if (changed.has('open')) this.listbox?.togglePopover(this.open);
  }

  /* @internal - used by options to update labels */
  handleDefaultSlotChange() {
    this.value = this.querySelector<Option>('mh-option[selected]')?.value;
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
    onEvent: ({ target, value }) => {
      this.#selectedOption?.removeAttribute('selected');
      target.setAttribute('selected', '');

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
      <slot @slotchange=${this.handleDefaultSlotChange}></slot>
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
