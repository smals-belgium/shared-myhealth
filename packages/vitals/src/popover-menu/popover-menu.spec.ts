import { fixture } from '@open-wc/testing';
import { html } from 'lit';

import { assertAccessibility, polyfillPopover } from '../core/testing';

import type { PopoverMenu } from './popover-menu';
import './popover-menu';

beforeAll(polyfillPopover);

const menuFixture = async () => {
  const wrapper = await fixture<HTMLDivElement>(html`
    <div>
      <button
        type="button"
        popovertarget="menu"
      >
        Actions
      </button>
      <mh-popover-menu id="menu">
        <button type="button">Edit</button>
        <button type="button">Delete</button>
      </mh-popover-menu>
    </div>
  `);
  const el = wrapper.querySelector<PopoverMenu>('mh-popover-menu')!;
  await el.updateComplete;
  return { wrapper, el, trigger: wrapper.querySelector('button')! };
};

describe('popover-menu', () => {
  describe('accessibility', () => {
    it('passes accessibility tests', async () => {
      const { wrapper } = await menuFixture();

      await assertAccessibility(wrapper);
    });

    it('sets popover="auto" and role="menu" on the host', async () => {
      const { el } = await menuFixture();

      expect(el.getAttribute('popover')).toBe('auto');
      expect(el.getAttribute('role')).toBe('menu');
    });

    it('sets aria-haspopup="menu" on linked triggers', async () => {
      const { trigger } = await menuFixture();

      expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    });

    it('sets role="menuitem" on slotted items', async () => {
      const { el } = await menuFixture();
      const slot = el.shadowRoot?.querySelector('slot');
      slot?.dispatchEvent(new Event('slotchange'));

      const items = el.querySelectorAll('button');
      expect(items.length).toBe(2);
      items.forEach(item => expect(item.getAttribute('role')).toBe('menuitem'));
    });
  });

  describe('defaults', () => {
    it('is closed by default', async () => {
      const { el } = await menuFixture();

      expect(el.open).toBe(false);
      expect(el.hasAttribute('open')).toBe(false);
    });

    it('defaults to position "below" and align "start"', async () => {
      const { el } = await menuFixture();

      expect(el.position).toBe('below');
      expect(el.getAttribute('position')).toBe('below');
      expect(el.align).toBe('start');
      expect(el.getAttribute('align')).toBe('start');
    });
  });

  describe('position and alignment', () => {
    (['above', 'below'] as const).forEach(position => {
      it(`reflects position "${position}" to an attribute`, async () => {
        const el = await fixture<PopoverMenu>(
          html`<mh-popover-menu
            id="m"
            position=${position}
          ></mh-popover-menu>`,
        );

        expect(el.position).toBe(position);
        expect(el.getAttribute('position')).toBe(position);
      });
    });

    (['start', 'center', 'end'] as const).forEach(align => {
      it(`reflects align "${align}" to an attribute`, async () => {
        const el = await fixture<PopoverMenu>(
          html`<mh-popover-menu
            id="m"
            align=${align}
          ></mh-popover-menu>`,
        );

        expect(el.align).toBe(align);
        expect(el.getAttribute('align')).toBe(align);
      });
    });
  });

  describe('missing trigger', () => {
    it('emits mh-error when no trigger is linked', async () => {
      const container = await fixture<HTMLDivElement>(html`<div></div>`);
      const handler = vi.fn();
      container.addEventListener('mh-error', handler);

      const el = document.createElement('mh-popover-menu');
      el.id = 'orphan';
      container.appendChild(el);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].message).toContain('orphan');
    });

    it('does not emit mh-error when a trigger is linked', async () => {
      const container = await fixture<HTMLDivElement>(html`<div></div>`);
      const handler = vi.fn();
      container.addEventListener('mh-error', handler);

      const trigger = document.createElement('button');
      trigger.setAttribute('popovertarget', 'linked');
      container.appendChild(trigger);
      const el = document.createElement('mh-popover-menu');
      el.id = 'linked';
      container.appendChild(el);

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('open / close', () => {
    it('opens and reflects the open attribute when open is set', async () => {
      const { el } = await menuFixture();

      el.open = true;
      await el.updateComplete;

      expect(el.hasAttribute('open')).toBe(true);
      expect(el.hasAttribute('popover-open')).toBe(true);
    });

    it('closes when open is set back to false', async () => {
      const { el } = await menuFixture();
      el.open = true;
      await el.updateComplete;

      el.open = false;
      await el.updateComplete;

      expect(el.hasAttribute('open')).toBe(false);
      expect(el.hasAttribute('popover-open')).toBe(false);
    });

    it('syncs open with native toggle events', async () => {
      const { el } = await menuFixture();

      el.showPopover();
      expect(el.open).toBe(true);

      el.hidePopover();
      expect(el.open).toBe(false);
    });

    it('closes when an item is clicked', async () => {
      const { el } = await menuFixture();
      el.open = true;
      await el.updateComplete;

      el.querySelector('button')?.click();

      expect(el.open).toBe(false);
    });

    it('no longer closes on click after being disconnected', async () => {
      const { el } = await menuFixture();
      el.remove();
      el.open = true;

      el.click();

      expect(el.open).toBe(true);
    });
  });

  describe('toggle()', () => {
    it('opens when closed', async () => {
      const { el } = await menuFixture();

      expect(el.toggle()).toBe(true);
      expect(el.open).toBe(true);
    });

    it('closes when open', async () => {
      const { el } = await menuFixture();
      el.open = true;

      expect(el.toggle()).toBe(false);
      expect(el.open).toBe(false);
    });

    it('honours the force argument', async () => {
      const { el } = await menuFixture();

      el.toggle(true);
      el.toggle(true);
      expect(el.open).toBe(true);

      el.toggle(false);
      expect(el.open).toBe(false);
    });
  });
});
