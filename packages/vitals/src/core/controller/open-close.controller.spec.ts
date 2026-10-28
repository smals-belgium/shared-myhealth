import { fixture } from '@open-wc/testing';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { polyfillPopover } from '../testing';

import { openCloseController } from './open-close.controller';

@customElement('test-open-close-host')
class TestHost extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('popover', 'auto');
    this.addController(openCloseController(this));
  }
}

beforeAll(polyfillPopover);

describe('openCloseController', () => {
  it('shows the popover when open becomes true', async () => {
    const el = await fixture<TestHost>(
      html`<test-open-close-host></test-open-close-host>`,
    );

    el.open = true;
    await el.updateComplete;

    expect(el.hasAttribute('popover-open')).toBe(true);
  });

  it('hides the popover when open becomes false', async () => {
    const el = await fixture<TestHost>(
      html`<test-open-close-host></test-open-close-host>`,
    );
    el.open = true;
    await el.updateComplete;

    el.open = false;
    await el.updateComplete;

    expect(el.hasAttribute('popover-open')).toBe(false);
  });

  it('does not open the popover initially when closed', async () => {
    const el = await fixture<TestHost>(
      html`<test-open-close-host></test-open-close-host>`,
    );

    expect(el.hasAttribute('popover-open')).toBe(false);
  });

  it('opens initially when open attribute is set', async () => {
    const el = await fixture<TestHost>(
      html`<test-open-close-host open></test-open-close-host>`,
    );

    expect(el.hasAttribute('popover-open')).toBe(true);
  });

  it('syncs open to true on a native toggle event', async () => {
    const el = await fixture<TestHost>(
      html`<test-open-close-host></test-open-close-host>`,
    );

    el.dispatchEvent(new ToggleEvent('toggle', { newState: 'open' }));

    expect(el.open).toBe(true);
  });

  it('syncs open to false on a native toggle event', async () => {
    const el = await fixture<TestHost>(
      html`<test-open-close-host open></test-open-close-host>`,
    );

    el.dispatchEvent(new ToggleEvent('toggle', { newState: 'closed' }));

    expect(el.open).toBe(false);
  });

  it('stops listening to toggle events when disconnected', async () => {
    const el = await fixture<TestHost>(
      html`<test-open-close-host></test-open-close-host>`,
    );
    el.remove();

    el.dispatchEvent(new ToggleEvent('toggle', { newState: 'open' }));

    expect(el.open).toBe(false);
  });
});
