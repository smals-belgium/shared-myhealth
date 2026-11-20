import { fixture } from '@open-wc/testing';
import { html } from 'lit';

import { assertAccessibility } from '../core/testing';

import '.';
import type { NavGroup } from './nav-group';
import type { NavList } from './nav-list';

const flushObserver = () =>
  new Promise(resolve => {
    setTimeout(resolve);
  });

const listItems = (el: Element) =>
  Array.from(el.shadowRoot?.querySelectorAll('li') ?? []);

describe('nav-list', () => {
  describe('accessibility', () => {
    it('passes accessibility tests', async () => {
      await assertAccessibility(
        await fixture<NavList>(html`
          <mh-nav-list>
            <a href="/one">One</a>
            <a href="/two">Two</a>
          </mh-nav-list>
        `),
      );
    });
  });

  describe('structure', () => {
    it('renders a nav containing a list', async () => {
      const el = await fixture<NavList>(
        html`<mh-nav-list><a href="/one">One</a></mh-nav-list>`,
      );

      expect(el.shadowRoot?.querySelector('nav > ul')).not.toBeNull();
    });

    it('renders one list item per child, each with its own slot', async () => {
      const el = await fixture<NavList>(html`
        <mh-nav-list>
          <a href="/one">One</a>
          <a href="/two">Two</a>
        </mh-nav-list>
      `);
      await flushObserver();
      await el.updateComplete;

      const slots = listItems(el).map(li => li.querySelector('slot'));
      expect(slots).toHaveLength(2);

      const links = Array.from(el.querySelectorAll('a'));
      links.forEach((link, index) => {
        expect(slots[index]?.assignedElements()).toEqual([link]);
      });
    });

    it('keeps the children in the light DOM', async () => {
      const el = await fixture<NavList>(
        html`<mh-nav-list><a href="/one">One</a></mh-nav-list>`,
      );
      await flushObserver();

      expect(el.querySelector('a')?.parentElement).toBe(el);
      expect(el.shadowRoot?.querySelector('a')).toBeNull();
    });

    it('renders a chevron for items but not for groups', async () => {
      const el = await fixture<NavList>(html`
        <mh-nav-list>
          <a href="/one">One</a>
          <mh-nav-group><a href="/two">Two</a></mh-nav-group>
        </mh-nav-list>
      `);
      await flushObserver();
      await el.updateComplete;

      const [item, group] = listItems(el);
      expect(item.querySelector('[part="icon"]')).not.toBeNull();
      expect(group.querySelector('[part="icon"]')).toBeNull();
    });
  });

  describe('dynamic children', () => {
    it('adds a list item when a child is appended', async () => {
      const el = await fixture<NavList>(
        html`<mh-nav-list><a href="/one">One</a></mh-nav-list>`,
      );
      await flushObserver();

      const link = document.createElement('a');
      link.href = '/two';
      el.append(link);
      await flushObserver();
      await el.updateComplete;

      expect(listItems(el)).toHaveLength(2);
      expect(link.slot).toBe('nav-item-1');
    });

    it('removes a list item and re-indexes when a child is removed', async () => {
      const el = await fixture<NavList>(html`
        <mh-nav-list>
          <a href="/one">One</a>
          <a href="/two">Two</a>
        </mh-nav-list>
      `);
      await flushObserver();

      const [first, second] = Array.from(el.querySelectorAll('a'));
      first.remove();
      await flushObserver();
      await el.updateComplete;

      expect(listItems(el)).toHaveLength(1);
      expect(second.slot).toBe('nav-item-0');
    });

    it('reflects the disabled state of a child on its list item', async () => {
      const el = await fixture<NavList>(
        html`<mh-nav-list><button>One</button></mh-nav-list>`,
      );
      await flushObserver();
      await el.updateComplete;
      const [li] = listItems(el);
      expect(li.hasAttribute('data-has-disabled')).toBe(false);

      el.querySelector('button')?.setAttribute('disabled', '');
      await flushObserver();
      await el.updateComplete;

      expect(listItems(el)[0].hasAttribute('data-has-disabled')).toBe(true);
    });

    it('ignores changes deeper in the tree', async () => {
      const el = await fixture<NavList>(
        html`<mh-nav-list
          ><a href="/one"><span>One</span></a></mh-nav-list
        >`,
      );
      await flushObserver();
      await el.updateComplete;
      const [before] = listItems(el);

      el.querySelector('span')?.append(' more');
      await flushObserver();
      await el.updateComplete;

      expect(listItems(el)[0]).toBe(before);
    });
  });
});

describe('nav-group', () => {
  it('renders a list without creating a nested nav', async () => {
    const el = await fixture<NavGroup>(html`
      <mh-nav-group>
        <a href="/one">One</a>
        <a href="/two">Two</a>
      </mh-nav-group>
    `);
    await flushObserver();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('nav')).toBeNull();
    expect(listItems(el)).toHaveLength(2);
  });

  it('does not treat the header as an item', async () => {
    const el = await fixture<NavGroup>(html`
      <mh-nav-group>
        <h4 slot="header">Header</h4>
        <a href="/one">One</a>
      </mh-nav-group>
    `);
    await flushObserver();
    await el.updateComplete;

    expect(listItems(el)).toHaveLength(1);
    expect(el.querySelector('h4')?.slot).toBe('header');
  });

  it('manages its own items inside a nav-list', async () => {
    const list = await fixture<NavList>(html`
      <mh-nav-list>
        <mh-nav-group>
          <a href="/one">One</a>
          <a href="/two">Two</a>
        </mh-nav-group>
      </mh-nav-list>
    `);
    await flushObserver();
    await list.updateComplete;

    const group = list.querySelector('mh-nav-group');
    await group?.updateComplete;

    expect(listItems(list)).toHaveLength(1);
    expect(listItems(group as Element)).toHaveLength(2);
  });
});
