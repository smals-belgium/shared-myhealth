import { html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { Size } from '../core';
import { ErrorEvent, LoadEvent } from '../core/event';

import { IconName } from './icon-name';
import styles from './icon.css?inline';
import size from './icon.size.css?inline';

export type IconSize = Size;

const icons: Record<string, string> = import.meta.glob('./svg/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

/**
 * The icon is drawn as a mask over the host's background, so that `--mh-icon__color-gradient` (or `currentColor`) is
 * resolved by the cascade alone, whenever and wherever the icon is rendered.
 */
const toMask = (svg: string) => {
  const namespaced = svg.includes('xmlns=')
    ? svg
    : svg.replace('<svg', `<svg xmlns="${SVG_NAMESPACE}"`);
  return `url("data:image/svg+xml,${encodeURIComponent(namespaced)}")`;
};

/**
 * @summary Icons are scalable vector symbols that represent actions, content, or status throughout your application.
 * @documentation https://smals-belgium.github.io/shared-myhealth/components/icon
 * @status stable
 * @since 1.0
 *
 * @event mh-load - Emitted when the icon has loaded.
 * @event mh-error - Emitted when the icon fails to load due to an error.
 *
 * @cssproperty --mh-icon__color-gradient - A gradient function to apply to the icon (only linear-gradient supported for now).
 * @cssproperty --mh-icon__size-angle-rotate - The rotation angle of the icon.
 */
@customElement('mh-icon')
export class Icon extends LitElement {
  static override readonly styles = [styles, size].map(unsafeCSS);

  @state() private svg = '';

  /** The name of the icon to draw. Available names depend on the icon library being used. */
  @property({ reflect: true }) name?: IconName;

  /**
   * An external URL of an SVG file. Be sure you trust the content you are including, as it will be executed as code and
   * can result in XSS attacks.
   */
  @property() src?: string;

  /**
   * An alternate description to use for assistive devices. If omitted, the icon will be considered presentational and
   * ignored by assistive devices.
   */
  @property() label = '';

  /** The icon's size. */
  @property({ reflect: true }) size: IconSize = 'm';

  protected override willUpdate(props: PropertyValues<this>) {
    if (props.has('src') && this.src && this.#validateSrc(this.src))
      this.#loadCustomSvg(this.src);
    if (props.has('name') && this.name) this.#loadBuiltInSvg(this.name);
  }

  protected override update(props: PropertyValues<this>): void {
    super.update(props);
    if (props.has('label')) this.#handleLabelChange();
  }

  #loadBuiltInSvg(name: IconName) {
    const key = `./svg/${name}.svg`;
    this.svg = icons[key] ?? '';
    this.dispatchEvent(new LoadEvent());
  }

  #validateSrc(src: string) {
    if (
      src.startsWith(window.location.origin) ||
      src.startsWith('./') ||
      src.startsWith('/')
    )
      return true;

    this.dispatchEvent(
      new ErrorEvent(
        `Attempting to load an SVG from a different origin: ${src}.
            For security and privacy reasons the myhealth design kit does not allow this.
            Custom SVGs can only be used when served by a trusted source.`,
      ),
    );
    return false;
  }

  #loadCustomSvg(src: string) {
    fetch(src)
      .then(res => {
        if (!res.ok)
          throw new Error(
            `Failed to fetch custom SVG. Status: ${res.statusText}`,
          );
        return res;
      })
      .then(res => res.text())
      .then(content => {
        if (!content.startsWith('<svg'))
          throw new Error(`Loaded content is not valid SVG.`);
        return content;
      })
      .then(svg => (this.svg = svg))
      .then(() => this.dispatchEvent(new LoadEvent()))
      .catch((error: unknown) => this.dispatchEvent(new ErrorEvent(error)));
  }

  #handleLabelChange() {
    const hasLabel = typeof this.label === 'string' && this.label.length > 0;

    if (hasLabel) {
      this.setAttribute('role', 'img');
      this.setAttribute('aria-label', this.label);
      this.removeAttribute('aria-hidden');
    } else {
      this.removeAttribute('role');
      this.removeAttribute('aria-label');
      this.setAttribute('aria-hidden', 'true');
    }
  }

  override render() {
    if (!this.svg) return html`#`;

    return html`<span
      part="base"
      style=${styleMap({ '--__icon__mask': toMask(this.svg) })}
    ></span>`;
  }
}
