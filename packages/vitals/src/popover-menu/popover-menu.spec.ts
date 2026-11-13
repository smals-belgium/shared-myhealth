import { fixture } from '@open-wc/testing';
import { html } from 'lit';

import '../button/anchor';
import '../button/button';
import { assertAccessibility, polyfillPopover } from '../core/testing';

import { resolveFocusTarget } from './focus-target';
import type { PopoverMenu } from './popover-menu';
import './popover-menu';

beforeAll(polyfillPopover);

const menuFixture = async () => {
  const wrapper = await fixture<HTMLDivElement>(html`
    <div>
      <mh-button
        type="button"
        popovertarget="menu"
      >
        Actions
      </mh-button>
      <mh-popover-menu
        id="menu"
        label="Actions"
      >
        <mh-button>Edit</mh-button>
        <mh-button>Delete</mh-button>
      </mh-popover-menu>
    </div>
  `);
  const el = wrapper.querySelector<PopoverMenu>('mh-popover-menu')!;
  await el.updateComplete;
  return { wrapper, el, trigger: wrapper.querySelector('mh-button')! };
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

    it('sets aria-haspopup="menu" on the native button inside an mh-button trigger', async () => {
      const { trigger } = await menuFixture();
      await resolveFocusTarget(trigger);

      const inner = trigger.shadowRoot?.querySelector('button');
      expect(inner?.getAttribute('aria-haspopup')).toBe('menu');
    });

    it('syncs aria-expanded on the native button inside an mh-button trigger', async () => {
      const { el, trigger } = await menuFixture();

      el.open = true;
      await el.updateComplete;
      await resolveFocusTarget(trigger);

      const inner = trigger.shadowRoot?.querySelector('button');
      expect(inner?.getAttribute('aria-expanded')).toBe('true');
      expect(trigger.hasAttribute('aria-expanded')).toBe(false);
    });

    it('sets aria attributes directly on a native button trigger', async () => {
      const wrapper = await fixture<HTMLElement>(html`
        <div>
          <button popovertarget="native">Open</button>
          <mh-popover-menu
            id="native"
            label="Actions"
            ><mh-button>Edit</mh-button></mh-popover-menu
          >
        </div>
      `);
      const button = wrapper.querySelector('button')!;
      const menu = wrapper.querySelector('mh-popover-menu') as PopoverMenu;
      menu.open = true;
      await menu.updateComplete;
      await resolveFocusTarget(button);

      expect(button.getAttribute('aria-haspopup')).toBe('menu');
      expect(button.getAttribute('aria-expanded')).toBe('true');
    });

    it('sets role="menuitem" and tabindex="-1" on the native element of slotted items', async () => {
      const { el } = await menuFixture();
      const slot = el.shadowRoot?.querySelector('slot');
      slot?.dispatchEvent(new Event('slotchange'));

      const items = el.querySelectorAll('mh-button');
      expect(items.length).toBe(2);
      const inners = await Promise.all(
        Array.from(items, item => resolveFocusTarget(item)),
      );
      inners.forEach((inner, index) => {
        expect(inner).not.toBe(items[index]);
        expect(inner.getAttribute('role')).toBe('menuitem');
        expect(inner.getAttribute('tabindex')).toBe('-1');
        expect(items[index].hasAttribute('role')).toBe(false);
      });
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

  describe('label', () => {
    it('sets aria-label on the host', async () => {
      const { el } = await menuFixture();

      expect(el.getAttribute('aria-label')).toBe('Actions');
    });

    it('updates aria-label when the label changes', async () => {
      const { el } = await menuFixture();

      el.label = 'More actions';
      await el.updateComplete;

      expect(el.getAttribute('aria-label')).toBe('More actions');
    });

    it('emits mh-error when initially rendered without a label', async () => {
      const container = await fixture<HTMLDivElement>(html`<div></div>`);
      const handler = vi.fn();
      container.addEventListener('mh-error', handler);

      const el = document.createElement('mh-popover-menu');
      el.id = 'unlabelled';
      container.appendChild(el);
      await el.updateComplete;

      const messages = handler.mock.calls.map(([event]) => event.message);
      expect(messages.some(message => message.includes('label'))).toBe(true);
      expect(el.hasAttribute('aria-label')).toBe(false);
    });
  });

  describe('open / close', () => {
    it('invokes the popover from the trigger when opened through the property', async () => {
      const { el, trigger } = await menuFixture();
      const showPopover = vi.spyOn(el, 'togglePopover');

      el.open = true;
      await el.updateComplete;

      expect(showPopover).toHaveBeenCalledWith({
        source: trigger,
        force: true,
      });
    });

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

      el.querySelector('mh-button')?.click();

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

  describe('without enabled items', () => {
    const disabledMenuFixture = async () => {
      const wrapper = await fixture<HTMLDivElement>(html`
        <div>
          <mh-button popovertarget="menu">Actions</mh-button>
          <mh-popover-menu
            id="menu"
            label="Actions"
          >
            <mh-button disabled>Edit</mh-button>
            <mh-button disabled>Delete</mh-button>
          </mh-popover-menu>
        </div>
      `);
      const el = wrapper.querySelector<PopoverMenu>('mh-popover-menu')!;
      await el.updateComplete;
      return el;
    };

    it('focuses the menu itself when opened', async () => {
      const el = await disabledMenuFixture();

      el.open = true;
      await el.updateComplete;

      expect(document.activeElement).toBe(el);
    });

    it('ignores arrow keys instead of throwing', async () => {
      const el = await disabledMenuFixture();
      el.open = true;
      await el.updateComplete;

      expect(() =>
        el.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
        ),
      ).not.toThrow();
    });

    it('does not throw when opened without any items', async () => {
      const wrapper = await fixture<HTMLDivElement>(html`
        <div>
          <mh-button popovertarget="empty">Actions</mh-button>
          <mh-popover-menu
            id="empty"
            label="Actions"
          ></mh-popover-menu>
        </div>
      `);
      const el = wrapper.querySelector<PopoverMenu>('mh-popover-menu')!;

      el.open = true;

      await expect(el.updateComplete).resolves.toBeDefined();
    });
  });

  describe('keyboard', () => {
    const press = (el: HTMLElement, key: string) => {
      const event = new KeyboardEvent('keydown', {
        key,
        bubbles: true,
        cancelable: true,
      });
      el.dispatchEvent(event);
      return event;
    };

    it('claims navigation keys when open', async () => {
      const { el } = await menuFixture();
      el.open = true;
      await el.updateComplete;

      expect(press(el, 'ArrowDown').defaultPrevented).toBe(true);
    });

    it('leaves other keys alone when open', async () => {
      const { el } = await menuFixture();
      el.open = true;
      await el.updateComplete;

      ['PageDown', 'F5', 'a'].forEach(key =>
        expect(press(el, key).defaultPrevented).toBe(false),
      );
    });
  });

  describe('navigation', () => {
    const navFixture = async () => {
      const wrapper = await fixture<HTMLDivElement>(html`
        <div>
          <mh-button popovertarget="nav">Actions</mh-button>
          <mh-popover-menu
            id="nav"
            label="Actions"
          >
            <mh-button id="one">One</mh-button>
            <mh-button
              id="two"
              disabled
              >Two</mh-button
            >
            <mh-button id="three">Three</mh-button>
            <mh-a
              id="four"
              href="#four"
              >Four</mh-a
            >
          </mh-popover-menu>
        </div>
      `);
      const el = wrapper.querySelector<PopoverMenu>('mh-popover-menu')!;
      el.open = true;
      await el.updateComplete;
      const item = (id: string) => el.querySelector<HTMLElement>(`#${id}`)!;
      return { el, item };
    };

    const press = (
      el: HTMLElement,
      key: string,
      init: ConstructorParameters<typeof KeyboardEvent>[1] = {},
    ) => {
      const event = new KeyboardEvent('keydown', {
        key,
        bubbles: true,
        cancelable: true,
        ...init,
      });
      el.dispatchEvent(event);
      return event;
    };

    it('focuses the first enabled item when opened', async () => {
      const { item } = await navFixture();

      expect(document.activeElement).toBe(item('one'));
    });

    it('moves to the next enabled item on ArrowDown, skipping disabled ones', async () => {
      const { el, item } = await navFixture();

      press(el, 'ArrowDown');

      expect(document.activeElement).toBe(item('three'));
    });

    it('wraps around from the last item on ArrowDown', async () => {
      const { el, item } = await navFixture();
      item('four').focus();

      press(el, 'ArrowDown');

      expect(document.activeElement).toBe(item('one'));
    });

    it('moves to the previous enabled item on ArrowUp, skipping disabled ones', async () => {
      const { el, item } = await navFixture();
      item('three').focus();

      press(el, 'ArrowUp');

      expect(document.activeElement).toBe(item('one'));
    });

    it('wraps around from the first item on ArrowUp', async () => {
      const { el, item } = await navFixture();

      press(el, 'ArrowUp');

      expect(document.activeElement).toBe(item('four'));
    });

    it('moves to the first and last items on Home and End', async () => {
      const { el, item } = await navFixture();

      press(el, 'End');
      expect(document.activeElement).toBe(item('four'));

      press(el, 'Home');
      expect(document.activeElement).toBe(item('one'));
    });

    it('moves to the next enabled item when Home or End land on a disabled one', async () => {
      const { el, item } = await navFixture();
      item('two').removeAttribute('disabled');
      (item('one') as HTMLButtonElement & { disabled: boolean }).disabled =
        true;
      await (item('one') as PopoverMenu).updateComplete;

      press(el, 'Home');

      expect(document.activeElement).toBe(item('two'));
    });

    it('does not claim Tab and closes the menu', async () => {
      const { el } = await navFixture();

      const event = press(el, 'Tab');
      await el.updateComplete;

      expect(event.defaultPrevented).toBe(false);
      expect(el.open).toBe(false);
    });

    it.each(['Enter', ' ', 'Escape'])(
      'leaves %j alone so native behaviour can handle it',
      async key => {
        const { el, item } = await navFixture();

        const event = press(el, key);

        expect(event.defaultPrevented).toBe(false);
        expect(document.activeElement).toBe(item('one'));
      },
    );

    it('ignores navigation keys with a modifier', async () => {
      const { el, item } = await navFixture();

      const event = press(el, 'ArrowDown', { ctrlKey: true });

      expect(event.defaultPrevented).toBe(false);
      expect(document.activeElement).toBe(item('one'));
    });

    it('stops handling keys once closed', async () => {
      const { el, item } = await navFixture();
      el.open = false;
      await el.updateComplete;
      item('one').focus();

      const event = press(el, 'ArrowDown');

      expect(event.defaultPrevented).toBe(false);
      expect(document.activeElement).toBe(item('one'));
    });

    it('focuses the last enabled item when opened with ArrowUp on the trigger', async () => {
      const { el, item } = await navFixture();
      el.open = false;
      await el.updateComplete;

      const trigger = el.parentElement!.querySelector('mh-button')!;
      press(trigger, 'ArrowUp');
      await el.updateComplete;
      await Promise.resolve();

      expect(document.activeElement).toBe(item('four'));
    });

    it('does not reopen or move focus on ArrowDown on the trigger when already open', async () => {
      const { el, item } = await navFixture();
      item('three').focus();

      const trigger = el.parentElement!.querySelector('mh-button')!;
      const event = press(trigger, 'ArrowDown');

      expect(event.defaultPrevented).toBe(false);
      expect(document.activeElement).toBe(item('three'));
    });
  });

  describe('anchor of a programmatic open', () => {
    const multiFixture = async () => {
      const wrapper = await fixture<HTMLDivElement>(html`
        <div>
          <mh-button
            id="first"
            popovertarget="multi"
            >First</mh-button
          >
          <mh-button
            id="second"
            popovertarget="multi"
            >Second</mh-button
          >
          <mh-popover-menu
            id="multi"
            label="Actions"
          >
            <mh-button>Edit</mh-button>
          </mh-popover-menu>
        </div>
      `);
      const el = wrapper.querySelector<PopoverMenu>('mh-popover-menu')!;
      await el.updateComplete;
      return { el, wrapper };
    };

    it('anchors to the first trigger when none was used yet', async () => {
      const { el, wrapper } = await multiFixture();
      const showPopover = vi.spyOn(el, 'togglePopover');

      el.open = true;
      await el.updateComplete;

      expect(showPopover).toHaveBeenCalledWith({
        source: wrapper.querySelector('#first'),
        force: true,
      });
    });

    it.each(['pointerdown', 'keydown'])(
      'anchors to the trigger last used through %s',
      async type => {
        const { el, wrapper } = await multiFixture();
        const showPopover = vi.spyOn(el, 'togglePopover');

        wrapper
          .querySelector('#second')!
          .dispatchEvent(new Event(type, { bubbles: true }));
        el.open = true;
        await el.updateComplete;

        expect(showPopover).toHaveBeenCalledWith({
          source: wrapper.querySelector('#second'),
          force: true,
        });
      },
    );

    it('stops tracking the triggers once disconnected', async () => {
      const wrapper = await fixture<HTMLDivElement>(html`
        <div>
          <mh-button popovertarget="gone">Trigger</mh-button>
          <mh-popover-menu
            id="gone"
            label="Actions"
          ></mh-popover-menu>
        </div>
      `);
      const signals: AbortSignal[] = [];
      const addListener = document.addEventListener.bind(document);
      const spy = vi
        .spyOn(document, 'addEventListener')
        .mockImplementation((type, listener, options) => {
          if (typeof options === 'object' && options.signal)
            signals.push(options.signal);
          addListener(type, listener, options);
        });
      const el = wrapper.querySelector<PopoverMenu>('mh-popover-menu')!;
      el.remove();
      wrapper.append(el);
      el.remove();
      await Promise.resolve();
      spy.mockRestore();

      expect(signals.length).toBeGreaterThan(0);
      expect(signals.every(signal => signal.aborted)).toBe(true);
    });
  });

  describe('late attribute binding (Angular)', () => {
    it('finds triggers whose popovertarget and id are only set after connecting', async () => {
      const container = await fixture<HTMLDivElement>(html`<div></div>`);
      const trigger = document.createElement('button');
      const el = document.createElement('mh-popover-menu');
      el.label = 'Actions';

      container.append(trigger, el);
      el.id = 'late';
      trigger.setAttribute('popovertarget', 'late');
      await el.updateComplete;
      await Promise.resolve();

      expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('opens without a source when there is no trigger', async () => {
      const wrapper = await fixture<HTMLDivElement>(html`
        <div><mh-popover-menu label="Actions"></mh-popover-menu></div>
      `);
      const el = wrapper.querySelector<PopoverMenu>('mh-popover-menu')!;
      const showPopover = vi.spyOn(el, 'togglePopover');

      el.open = true;
      await el.updateComplete;

      expect(showPopover).toHaveBeenCalledWith({
        source: undefined,
        force: true,
      });
    });
  });

  describe('opening from the trigger with the keyboard', () => {
    const press = (
      el: HTMLElement,
      key: string,
      init: ConstructorParameters<typeof KeyboardEvent>[1] = {},
    ) =>
      el.dispatchEvent(
        new KeyboardEvent('keydown', { key, bubbles: true, ...init }),
      );

    it('opens on ArrowDown', async () => {
      const { el, trigger } = await menuFixture();

      press(trigger, 'ArrowDown');
      await el.updateComplete;

      expect(el.open).toBe(true);
    });

    it('opens on ArrowUp', async () => {
      const { el, trigger } = await menuFixture();

      press(trigger, 'ArrowUp');
      await el.updateComplete;

      expect(el.open).toBe(true);
    });

    it('ignores arrow keys with a modifier and other keys', async () => {
      const { el, trigger } = await menuFixture();

      press(trigger, 'ArrowDown', { altKey: true });
      press(trigger, 'a');
      await el.updateComplete;

      expect(el.open).toBe(false);
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
