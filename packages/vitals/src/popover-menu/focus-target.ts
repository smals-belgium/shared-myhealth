import { LitElement } from 'lit';

type WrapsNativeElement = LitElement & {
  el: Element;
};

const isWrapper = (host: Element): host is WrapsNativeElement =>
  'el' in host && 'updateComplete' in host;

const resolveWrapper = (element: Element) =>
  isWrapper(element) ? element.updateComplete.then(() => element.el) : element;

/**
 * Resolve the element that assistive technology and the keyboard actually interact with. For a native element that is the
 * trigger itself; for a component wrapping a native control (e.g. `mh-button`) it is the wrapped element.
 * A custom element can only be recognised as a wrapper once it is defined (upgraded), so wait for that first.
 */
export const resolveFocusTarget = (element: Element) =>
  element.localName.includes('-')
    ? customElements
        .whenDefined(element.localName)
        .then(() => resolveWrapper(element))
    : Promise.resolve(element);

/**
 * Synchronous handle on the focus target of an element. The target may not exist yet (the component can still be
 * upgrading or rendering), so attribute writes are applied as soon as it resolves.
 */
export const focusTarget = (
  element: Element,
): Pick<Element, 'setAttribute'> => ({
  setAttribute: (name, value) => {
    resolveFocusTarget(element)
      .then(target => target.setAttribute(name, value))
      .catch(() => undefined);
  },
});
