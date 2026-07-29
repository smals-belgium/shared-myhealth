const propName = (el: Element, name: string) =>
  `--${el.tagName.toLowerCase()}__${name}`;

/**
 * Utility functions to read and write custom CSS properties of a Vital element.
 * The keys used as function paremeters should be only the part without the component prefix.
 * e.g. if the CSS variable is `--my-component__color-type`, then the key is `color-type`
 */
export const cssProperties = <K extends string>(el: HTMLElement) => ({
  get(key: K) {
    return getComputedStyle(el)
      .getPropertyValue(propName(el, key))
      .replaceAll(/\s+/gmu, ' ')
      .trim();
  },

  set(key: K, value: string) {
    return el.style.setProperty(propName(el, key), value);
  },

  has(key: K) {
    return this.get(key).length > 0;
  },
});
