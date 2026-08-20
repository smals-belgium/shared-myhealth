import type { LitElement } from 'lit';

export const overlay = <E extends LitElement>(ref: { element: E }) => ({
  ready: (callback: (element: E) => void) => {
    ref.element.updateComplete
      .then(() => callback(ref.element))
      .catch((error: unknown) => {
        throw new Error(
          `${ref.element.tagName.toLowerCase()} creation failed`,
          { cause: error },
        );
      });
  },
});
