import { fixture } from '@open-wc/testing';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
  PopoverTargetAction,
  popoverTriggerController,
} from './popover-trigger.controller';

@customElement('test-popover-trigger-host')
class TestHost extends LitElement {
  @property({ attribute: 'popovertarget' }) popoverTarget?: string;
  @property({ attribute: 'popovertargetaction' })
  popoverTargetAction: PopoverTargetAction = 'toggle';

  button!: HTMLButtonElement;

  protected override render() {
    return html`<button type="button"></button>`;
  }

  protected override firstUpdated() {
    this.button = this.shadowRoot!.querySelector('button')!;
    this.addController(popoverTriggerController(this, this.button));
  }
}

const setup = async (
  template = html`<test-popover-trigger-host></test-popover-trigger-host>`,
) => {
  const container = await fixture<HTMLDivElement>(html`
    <div>
      ${template}
      <div id="target"></div>
    </div>
  `);
  const host = container.querySelector<TestHost>('test-popover-trigger-host')!;
  await host.updateComplete;
  return { container, host };
};

describe('popoverTriggerController', () => {
  it('throws when the trigger is undefined', () => {
    const host = document.createElement(
      'test-popover-trigger-host',
    ) as TestHost;

    expect(() =>
      popoverTriggerController(host, undefined as unknown as HTMLButtonElement),
    ).toThrow(/Trigger element is undefined/u);
  });

  it('links the target element on click', async () => {
    const { container, host } = await setup();
    host.popoverTarget = 'target';

    host.click();

    expect(host.button.popoverTargetElement).toBe(
      container.querySelector('#target'),
    );
  });

  it('forwards the popoverTargetAction on click', async () => {
    const { host } = await setup();
    host.popoverTarget = 'target';
    host.popoverTargetAction = 'show';

    host.click();

    expect(host.button.popoverTargetAction).toBe('show');
  });

  it('does not link anything without a popoverTarget', async () => {
    const { host } = await setup();

    host.click();

    expect(host.button.popoverTargetElement ?? null).toBeNull();
  });

  it('resolves null for an unknown target id', async () => {
    const { host } = await setup();
    host.popoverTarget = 'missing';

    host.click();

    expect(host.button.popoverTargetElement).toBeNull();
  });

  it('picks up target changes on subsequent clicks', async () => {
    const { container, host } = await setup();
    const other = document.createElement('div');
    other.id = 'other';
    container.appendChild(other);

    host.popoverTarget = 'target';
    host.click();
    host.popoverTarget = 'other';
    host.click();

    expect(host.button.popoverTargetElement).toBe(other);
  });
});
