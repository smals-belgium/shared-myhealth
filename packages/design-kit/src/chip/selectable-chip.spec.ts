import { fixture, oneEvent } from '@open-wc/testing';
import { html } from 'lit';

import { assertAccessibility, part } from '../core/testing';

import '../icon';
import './selectable-chip';
import type { ChipSelectionChangeEvent } from './chip-selection-change.event';
import type { SelectableChip } from './selectable-chip';

describe('mh-selectable-chip', () => {
  describe('accessibility', () => {
    it('passes accessibility tests when unselected', async () => {
      await assertAccessibility(
        await fixture(html`<mh-selectable-chip>Filter</mh-selectable-chip>`),
      );
    });

    it('passes accessibility tests when selected', async () => {
      await assertAccessibility(
        await fixture(
          html`<mh-selectable-chip selected>Filter</mh-selectable-chip>`,
        ),
      );
    });

    it('passes accessibility tests when disabled', async () => {
      await assertAccessibility(
        await fixture(
          html`<mh-selectable-chip disabled>Filter</mh-selectable-chip>`,
        ),
      );
    });
  });

  describe('base', () => {
    it('renders a button as the base', async () => {
      const el = await fixture<SelectableChip>(
        html`<mh-selectable-chip>Filter</mh-selectable-chip>`,
      );
      expect(part('base', el)?.tagName).toBe('BUTTON');
    });
  });

  describe('selected', () => {
    it('is not selected by default', async () => {
      const el = await fixture<SelectableChip>(
        html`<mh-selectable-chip>Filter</mh-selectable-chip>`,
      );
      expect(el.selected).toBe(false);
      expect(el.hasAttribute('selected')).toBe(false);
    });

    it('reflects selected to the host attribute', async () => {
      const el = await fixture<SelectableChip>(
        html`<mh-selectable-chip selected>Filter</mh-selectable-chip>`,
      );
      expect(el.selected).toBe(true);
      expect(el.hasAttribute('selected')).toBe(true);
    });

    it('sets aria-pressed="true" when selected', async () => {
      const el = await fixture<SelectableChip>(
        html`<mh-selectable-chip selected>Filter</mh-selectable-chip>`,
      );
      expect(part('base', el)?.getAttribute('aria-pressed')).toBe('true');
    });

    it('sets aria-pressed="false" when unselected', async () => {
      const el = await fixture<SelectableChip>(
        html`<mh-selectable-chip>Filter</mh-selectable-chip>`,
      );
      expect(part('base', el)?.getAttribute('aria-pressed')).toBe('false');
    });

    it('toggles selection and emits mh-chip-selection-change on click', async () => {
      const el = await fixture<SelectableChip>(
        html`<mh-selectable-chip>Filter</mh-selectable-chip>`,
      );

      const changed = oneEvent(
        el,
        'mh-chip-selection-change',
      ) as Promise<ChipSelectionChangeEvent>;
      part<HTMLButtonElement>('base', el)?.click();
      const event = await changed;

      expect(event.selected).toBe(true);
      expect(el.selected).toBe(true);
    });

    it('does not toggle when disabled', async () => {
      const el = await fixture<SelectableChip>(
        html`<mh-selectable-chip disabled>Filter</mh-selectable-chip>`,
      );
      const changeHandler = vi.fn();

      el.addEventListener('mh-chip-selection-change', changeHandler);
      part<HTMLButtonElement>('base', el)?.click();

      expect(changeHandler).not.toHaveBeenCalled();
      expect(el.selected).toBe(false);
    });
  });

  describe('disabled', () => {
    it('is not disabled by default', async () => {
      const el = await fixture<SelectableChip>(
        html`<mh-selectable-chip>Filter</mh-selectable-chip>`,
      );
      expect(el.disabled).toBe(false);
    });

    it('reflects disabled to an attribute', async () => {
      const el = await fixture<SelectableChip>(
        html`<mh-selectable-chip disabled>Filter</mh-selectable-chip>`,
      );
      expect(el.disabled).toBe(true);
      expect(el.getAttribute('disabled')).toBe('');
    });
  });
});
