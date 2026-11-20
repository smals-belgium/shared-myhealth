/* eslint-disable max-classes-per-file -- subclasses are needed to re-define the elements under other tags */
import { fixture } from '@open-wc/testing';
import { html } from 'lit';

import '.';
import '../nav-list';
import { NavGroup as NavGroupElement } from '../nav-list/nav-group';
import type { NavGroup } from '../nav-list/nav-group';
import type { NavList } from '../nav-list/nav-list';

import { NavMenu as NavMenuElement } from './nav-menu';
import type { NavMenu } from './nav-menu';

const flushObserver = () =>
  new Promise(resolve => {
    setTimeout(resolve);
  });

describe('nav-menu', () => {
  it('renders a nav-group as a collapsible panel', async () => {
    const menu = await fixture<NavMenu>(html`
      <mh-nav-menu>
        <mh-nav-group>
          <h3 slot="header">Group</h3>
          <a href="/one">One</a>
        </mh-nav-group>
      </mh-nav-menu>
    `);
    await flushObserver();
    const group = menu.querySelector<NavGroup>('mh-nav-group');
    await group?.updateComplete;

    expect(group?.shadowRoot?.querySelector('details > summary')).toBeTruthy();
  });

  it('renders the same nav-group as a plain list inside a nav-list', async () => {
    const list = await fixture<NavList>(html`
      <mh-nav-list>
        <mh-nav-group>
          <h3 slot="header">Group</h3>
          <a href="/one">One</a>
        </mh-nav-group>
      </mh-nav-list>
    `);
    await flushObserver();
    const group = list.querySelector<NavGroup>('mh-nav-group');
    await group?.updateComplete;

    expect(group?.shadowRoot?.querySelector('details')).toBeNull();
    expect(group?.shadowRoot?.querySelector('ul')).toBeTruthy();
  });

  describe('accordion', () => {
    const open = async (group: NavGroup) => {
      const details = group.shadowRoot?.querySelector('details');
      if (details) details.open = true;
      await flushObserver();
    };
    const isOpen = (group: NavGroup) =>
      group.shadowRoot?.querySelector('details')?.open;

    const render = async (multiple: boolean) => {
      const menu = await fixture<NavMenu>(html`
        <mh-nav-menu ?multiple=${multiple}>
          <mh-nav-group
            ><h3 slot="header">A</h3>
            <a href="/a">A</a></mh-nav-group
          >
          <mh-nav-group
            ><h3 slot="header">B</h3>
            <a href="/b">B</a></mh-nav-group
          >
        </mh-nav-menu>
      `);
      await flushObserver();
      const [first, second] = [
        ...menu.querySelectorAll<NavGroup>('mh-nav-group'),
      ];
      await Promise.all([first.updateComplete, second.updateComplete]);
      return { first, second };
    };

    it('closes the other groups when one opens', async () => {
      const { first, second } = await render(false);
      await open(first);
      await open(second);

      expect(isOpen(first)).toBe(false);
      expect(isOpen(second)).toBe(true);
    });

    it('keeps other groups open with the multiple attribute', async () => {
      const { first, second } = await render(true);
      await open(first);
      await open(second);

      expect(isOpen(first)).toBe(true);
      expect(isOpen(second)).toBe(true);
    });
  });

  it('provides its renderer to groups that were upgraded before the menu', async () => {
    const host = document.createElement('div');
    host.innerHTML = `
      <late-nav-menu>
        <late-nav-group><h3 slot="header">Group</h3><a href="/one">One</a></late-nav-group>
      </late-nav-menu>`;
    document.body.append(host);

    customElements.define('late-nav-group', class extends NavGroupElement {});
    customElements.define('late-nav-menu', class extends NavMenuElement {});

    const group = host.querySelector<NavGroup>('late-nav-group');
    await group?.updateComplete;
    await flushObserver();
    await group?.updateComplete;

    expect(group?.shadowRoot?.querySelector('details')).toBeTruthy();
    host.remove();
  });
});
