import { elementUpdated, fixture, oneEvent } from '@open-wc/testing';
import { html } from 'lit';

import { LoadEvent } from '@vitals/core/event';
import { assertAccessibility, textContent } from '@vitals/core/testing';

import './icon';
import type { Icon } from './icon.js';

describe('icon', () => {
  describe('accessibility', () => {
    it(`passes accessibility tests`, async () => {
      assertAccessibility(
        await fixture(html`<vitals-icon name="search"></vitals-icon>`),
      );
    });

    it(`sets aria-hidden when no label is provided`, async () => {
      const el = await fixture(html`<vitals-icon name="search"></vitals-icon>`);
      expect(el.getAttribute('role')).toBeNull();
      expect(el.getAttribute('aria-label')).toBeNull();
      expect(el.getAttribute('aria-hidden')).toBe('true');
    });

    it(`sets role and aria-label when a label is provided`, async () => {
      const el = await fixture(
        html`<vitals-icon label="Search" name="search"></vitals-icon>`,
      );
      expect(el.getAttribute('role')).toBe('img');
      expect(el.getAttribute('aria-label')).toBe('Search');
      expect(el.getAttribute('aria-hidden')).toBeNull();
    });
  });

  describe('rendering', () => {
    it(`renders SVG for a built-in icon`, async () => {
      const el = await fixture<Icon>(html`<vitals-icon></vitals-icon>`);
      const listener = oneEvent(el, 'vitals-load');
      el.name = 'search';

      await listener;
      await elementUpdated(el);

      expect(el.shadowRoot?.querySelector('svg')).not.toBeNull();
    });

    it(`renders SVG from custom 'src'`, async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve('<svg></svg>'),
        } as Response),
      );

      const el = await fixture<Icon>(html`<vitals-icon></vitals-icon>`);
      const listener = oneEvent(el, 'vitals-load');
      el.src = './some.svg';

      await listener;
      await elementUpdated(el);

      expect(el.shadowRoot?.querySelector('svg')).not.toBeNull();
    });

    it(`renders '#' when anything goes wrong`, async () => {
      const el = await fixture<Icon>(html`<vitals-icon></vitals-icon>`);
      expect(el.shadowRoot?.querySelector('svg')).toBeNull();
      expect(textContent(el)).toBe('#');
    });
  });

  describe('size', () => {
    it(`has default 'm'`, async () => {
      const el = await fixture<Icon>(html`<vitals-icon></vitals-icon>`);

      expect(el.size).toBe('m');
      expect(el.getAttribute('size')).toBe('m');
    });

    it(`reflects size to an attribute`, async () => {
      const el = await fixture<Icon>(
        html`<vitals-icon size="l"></vitals-icon>`,
      );

      expect(el.size).toBe('l');
      expect(el.getAttribute('size')).toBe('l');
    });
  });

  describe('rotating', () => {
    it(`rotates the icon when 'rotate' is defined`, async () => {
      const el = await fixture<Icon>(
        html`<vitals-icon name="search" rotate="90"></vitals-icon>`,
      );

      await elementUpdated(el);
      await el.updateComplete;

      expect(getComputedStyle(el).getPropertyValue('--rotate-angle')).toBe(
        '90deg',
      );
    });

    it(`doesn't rotate the icon when 'rotate' is not defined`, async () => {
      const el = await fixture<Icon>(
        html`<vitals-icon name="search"></vitals-icon>`,
      );

      await elementUpdated(el);
      await el.updateComplete;

      expect(getComputedStyle(el).getPropertyValue('--rotate-angle')).toBe(
        '0deg',
      );
    });
  });

  describe('load event', () => {
    it(`emits vitals-load immediately when a built-in icon loads`, async () => {
      const el = await fixture<Icon>(html`<vitals-icon></vitals-icon>`);
      const listener = oneEvent(el, 'vitals-load');
      el.name = 'search';
      expect((await listener) instanceof LoadEvent).toBe(true);
    });
  });

  afterEach(() => vi.clearAllMocks());
});
