import { fixture } from '@open-wc/testing';
import { html } from 'lit';

import {
  assertAccessibility,
  defaultSlot,
  part,
  slot,
} from '@vitals/core/testing';

import './card';
import type { Card } from './card.js';

describe('card', () => {
  describe('accessibility', () => {
    it(`passes accessibility tests`, async () => {
      await assertAccessibility(
        await fixture(html`<vitals-card>content</vitals-card>`),
      );
    });

    it(`passes accessibility tests with header`, async () => {
      await assertAccessibility(
        await fixture(html`
          <vitals-card>
            <span slot="header">Header</span>
            content
          </vitals-card>
        `),
      );
    });

    it(`passes accessibility tests with header`, async () => {
      await assertAccessibility(
        await fixture(html`
          <vitals-card>
            content
            <span slot="footer">Footer</span>
          </vitals-card>
        `),
      );
    });
  });

  describe('appearance', () => {
    it(`has default appearance "raised"`, async () => {
      const el = await fixture<Card>(html`<vitals-card>content</vitals-card>`);

      expect(el.appearance).toBe('raised');
      expect(el.getAttribute('appearance')).toBe('raised');
    });

    it(`reflects appearance to an attribute`, async () => {
      const el = await fixture<Card>(
        html`<vitals-card appearance="outlined">content</vitals-card>`,
      );

      expect(el.appearance).toBe('outlined');
      expect(el.getAttribute('appearance')).toBe('outlined');
    });
  });

  describe('slots', () => {
    it('renders default slot content inside the body part', async () => {
      const el = await fixture<Card>(
        html`<vitals-card>Main content</vitals-card>`,
      );

      const bodyPart = part('body', el);
      expect(bodyPart).not.toBeNull();

      const slot = defaultSlot(el);
      bodyPart?.querySelector<HTMLSlotElement>('slot:not([name])');
      expect(slot).not.toBeNull();

      const assigned = slot?.assignedNodes({ flatten: true });
      expect(assigned?.length).toBe(1);
    });

    it('accepts content in the "header" slot', async () => {
      const el = await fixture<Card>(html`
        <vitals-card>
          <div slot="header">Header Title</div>
          Content
        </vitals-card>
      `);

      const assigned = slot('header', el)?.assignedNodes({ flatten: true });
      expect(assigned?.length).toBe(1);
    });

    it('accepts content in the "footer" slot', async () => {
      const el = await fixture<Card>(html`
        <vitals-card>
          Content
          <div slot="footer">Footer Content</div>
        </vitals-card>
      `);

      const assigned = slot('footer', el)?.assignedNodes({ flatten: true });
      expect(assigned?.length).toBe(1);
    });
  });
});
