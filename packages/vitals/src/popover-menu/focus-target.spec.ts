/* eslint-disable max-classes-per-file -- every test needs its own, freshly defined element class */
import { fixture } from '@open-wc/testing';
import { html } from 'lit';

import '../button/button';
import type { Button } from '../button';

import { focusTarget, resolveFocusTarget } from './focus-target';

describe('focus-target', () => {
  describe('resolveFocusTarget', () => {
    it('resolves a native element to itself', async () => {
      const button = await fixture<HTMLButtonElement>(
        html`<button>Native</button>`,
      );

      await expect(resolveFocusTarget(button)).resolves.toBe(button);
    });

    it('resolves a component wrapping a native control to that control', async () => {
      const button = await fixture<Button>(
        html`<mh-button>Wrapped</mh-button>`,
      );

      const target = await resolveFocusTarget(button);

      expect(target).toBe(button.shadowRoot?.querySelector('button'));
    });

    it('waits for a wrapper to be defined and rendered', async () => {
      const name = 'mh-late-wrapper';
      const el = document.createElement(name);
      document.body.append(el);
      const inner = document.createElement('button');

      const resolved = resolveFocusTarget(el);
      customElements.define(
        name,
        class extends HTMLElement {
          el = inner;
          updateComplete = Promise.resolve(true);
        },
      );

      await expect(resolved).resolves.toBe(inner);
      el.remove();
    });

    it('resolves a custom element that is no wrapper to itself once defined', async () => {
      const name = 'x-late-plain';
      const el = document.createElement(name);
      document.body.append(el);

      const resolved = resolveFocusTarget(el);
      customElements.define(name, class extends HTMLElement {});

      await expect(resolved).resolves.toBe(el);
      el.remove();
    });
  });

  describe('focusTarget', () => {
    it('writes attributes to a native element', async () => {
      const button = await fixture<HTMLButtonElement>(
        html`<button>Native</button>`,
      );

      focusTarget(button).setAttribute('aria-haspopup', 'menu');
      await resolveFocusTarget(button);

      expect(button.getAttribute('aria-haspopup')).toBe('menu');
    });

    it('writes attributes to the control wrapped by a component, not to the component', async () => {
      const button = await fixture<Button>(
        html`<mh-button>Wrapped</mh-button>`,
      );

      focusTarget(button).setAttribute('aria-expanded', 'true');
      await resolveFocusTarget(button);

      expect(
        button.shadowRoot
          ?.querySelector('button')
          ?.getAttribute('aria-expanded'),
      ).toBe('true');
      expect(button.hasAttribute('aria-expanded')).toBe(false);
    });
  });
});
