import { slotContentDirective } from './slot-content.directive';
import { slotFocusContainerDirective } from './slot-focus-container.directive';
import { slotDirective } from './slot.directive';

/** A host with a shadow root containing `<div><slot></slot></div>`, with the given light DOM children. */
const setup = (...children: Element[]) => {
  const host = document.createElement('div');
  const shadow = host.attachShadow({ mode: 'open' });
  const container = document.createElement('div');
  const slot = document.createElement('slot');
  container.append(slot);
  shadow.append(container);
  host.append(...children);
  document.body.append(host);
  return { host, container, slot };
};

const element = (html: string) => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild!;
};

const slotChange = (slot: HTMLSlotElement) =>
  slot.dispatchEvent(new Event('slotchange'));

afterEach(() => (document.body.innerHTML = ''));

describe('slotDirective', () => {
  it('passes the slot that changed to the handler', () => {
    const { slot } = setup();
    const handler = vi.fn();
    slot.addEventListener('slotchange', slotDirective(handler));

    slotChange(slot);

    expect(handler).toHaveBeenCalledWith(slot);
  });

  it('throws when used on something other than a slot', () => {
    const directive = slotDirective(vi.fn());
    const event = { target: document.createElement('div') } as unknown as Event;

    expect(() => directive(event)).toThrow(
      'slotDirective used on wrong element',
    );
  });
});

describe('slotContentDirective', () => {
  it('toggles mh-has-slotted-content with the presence of assigned elements', () => {
    const { host, slot } = setup();
    slot.addEventListener('slotchange', slotContentDirective);

    slotChange(slot);
    expect(slot.hasAttribute('mh-has-slotted-content')).toBe(false);

    host.append(element('<span>x</span>'));
    slotChange(slot);
    expect(slot.hasAttribute('mh-has-slotted-content')).toBe(true);
  });
});

describe('slotFocusContainerDirective', () => {
  const tabindexAfterSlotChange = (...children: Element[]) => {
    const { container, slot } = setup(...children);
    slot.addEventListener('slotchange', slotFocusContainerDirective);
    slotChange(slot);
    return container.getAttribute('tabindex');
  };

  it('makes the container a tab stop when the slot is empty', () => {
    expect(tabindexAfterSlotChange()).toBe('0');
  });

  it('makes the container a tab stop when content has nothing focusable', () => {
    expect(tabindexAfterSlotChange(element('<p>Just text</p>'))).toBe('0');
  });

  it('leaves out the tab stop when content is directly focusable', () => {
    expect(
      tabindexAfterSlotChange(element('<a href="#x">Link</a>')),
    ).toBeNull();
  });

  it('leaves out the tab stop when a descendant is focusable', () => {
    expect(
      tabindexAfterSlotChange(element('<div><p><button>Go</button></p></div>')),
    ).toBeNull();
  });

  it('leaves out the tab stop when a focusable element is inside a shadow root', () => {
    const custom = element('<div></div>');
    custom.attachShadow({ mode: 'open' }).innerHTML = '<button>Go</button>';

    expect(tabindexAfterSlotChange(custom)).toBeNull();
  });

  it('removes a tab stop it set earlier once focusable content arrives', () => {
    const { host, container, slot } = setup();
    slot.addEventListener('slotchange', slotFocusContainerDirective);
    slotChange(slot);
    expect(container.getAttribute('tabindex')).toBe('0');

    host.append(element('<button>Go</button>'));
    slotChange(slot);

    expect(container.hasAttribute('tabindex')).toBe(false);
  });

  it.each([
    ['disabled', '<button disabled>No</button>'],
    ['inert', '<button inert>No</button>'],
    ['tabindex="-1"', '<div tabindex="-1">No</div>'],
    ['a link without href', '<a>No</a>'],
    ['a hidden input', '<input type="hidden" />'],
    ['contenteditable="false"', '<div contenteditable="false">No</div>'],
  ])('ignores content that is not a tab stop: %s', (_name, html) => {
    expect(tabindexAfterSlotChange(element(html))).toBe('0');
  });

  it.each([
    ['tabindex="0"', '<div tabindex="0">Yes</div>'],
    ['an input', '<input />'],
    ['a select', '<select></select>'],
    ['a textarea', '<textarea></textarea>'],
    ['a summary', '<details><summary>Yes</summary></details>'],
    ['contenteditable', '<div contenteditable="true">Yes</div>'],
    ['audio with controls', '<audio controls></audio>'],
  ])('recognises %s as a tab stop', (_name, html) => {
    expect(tabindexAfterSlotChange(element(html))).toBeNull();
  });
});
