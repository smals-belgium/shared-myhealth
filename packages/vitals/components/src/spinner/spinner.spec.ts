import { fixture } from '@open-wc/testing';
import { html } from 'lit';

import { adoptedStylesheet, assertAccessibility } from '@vitals/core/testing';

import './spinner';

describe('spinner', () => {
  describe('accessibility', () => {
    it('should pass accessibility tests', async () => {
      assertAccessibility(
        await fixture(html`<vitals-spinner></vitals-spinner>`),
      );
    });

    it('should have role="progressbar" on the base part', async () => {
      const el = await fixture(html`<vitals-spinner></vitals-spinner>`);
      const base = el.shadowRoot?.querySelector('[part~="base"]');
      expect(base?.getAttribute('role')).toBe('progressbar');
    });

    it('should have an aria-label for loading', async () => {
      const el = await fixture(html`<vitals-spinner></vitals-spinner>`);
      const base = el.shadowRoot?.querySelector('[part~="base"]');
      expect(base?.getAttribute('aria-label')).toBe('Loading');
    });
  });

  describe('CSS parts', () => {
    it('should have a base part', async () => {
      const el = await fixture(html`<vitals-spinner></vitals-spinner>`);
      expect(el.shadowRoot?.querySelector('[part~="base"]')).not.toBeNull();
    });
  });

  describe('rendering', () => {
    it('should have flex:none to prevent flex re-sizing', async () => {
      const el = await fixture(html`<vitals-spinner></vitals-spinner>`);
      expect(adoptedStylesheet(el).includes('flex: none')).toBe(true);
    });
  });
});
