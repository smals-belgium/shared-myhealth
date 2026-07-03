import { fixture } from '@open-wc/testing';
import { html } from 'lit';

import { assertAccessibility, part } from '../core/testing';

import '../icon';
import './display-chip';
import type { DisplayChip, DisplayChipVariant } from './display-chip';

const variants: DisplayChipVariant[] = [
  'brand',
  'success',
  'neutral',
  'warning',
  'danger',
  'tertiary',
];

describe('mh-display-chip', () => {
  describe('accessibility', () => {
    it('passes accessibility tests', async () => {
      await assertAccessibility(
        await fixture(html`<mh-display-chip>Active</mh-display-chip>`),
      );
    });

    variants.forEach(variant => {
      it(`is accessible with variant "${variant}"`, async () => {
        await assertAccessibility(
          await fixture<DisplayChip>(
            html`<mh-display-chip variant=${variant}>Status</mh-display-chip>`,
          ),
        );
      });
    });
  });

  describe('variant', () => {
    it('has default variant "neutral"', async () => {
      const el = await fixture<DisplayChip>(
        html`<mh-display-chip>Status</mh-display-chip>`,
      );
      expect(el.variant).toBe('neutral');
      expect(el.getAttribute('variant')).toBe('neutral');
    });

    it('reflects variant to an attribute', async () => {
      const el = await fixture<DisplayChip>(
        html`<mh-display-chip variant="danger">Status</mh-display-chip>`,
      );
      expect(el.variant).toBe('danger');
      expect(el.getAttribute('variant')).toBe('danger');
    });
  });

  describe('base', () => {
    it('renders a span as the base', async () => {
      const el = await fixture<DisplayChip>(
        html`<mh-display-chip>Status</mh-display-chip>`,
      );
      expect(part('base', el)?.tagName).toBe('SPAN');
    });
  });
});
