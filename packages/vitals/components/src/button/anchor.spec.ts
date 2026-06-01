import { elementUpdated, fixture } from '@open-wc/testing';
import { html } from 'lit';

import { assertAccessibility } from '@vitals/core/testing';

import './anchor';
import type { Anchor } from './anchor.js';
import type { ButtonVariant } from './base.js';

const variants: ButtonVariant[] = ['brand', 'success', 'warning', 'danger'];

describe('a', () => {
  const getA = (el: Element) => el.shadowRoot?.querySelector('a');

  describe('accessibility', () => {
    it(`passes accessibility tests`, async () => {
      await assertAccessibility(
        await fixture(html`<vitals-a>click</vitals-a>`),
      );
    });

    variants.forEach((variant) => {
      it(`is accessible when variant is "${variant}"`, async () => {
        await assertAccessibility(
          await fixture<Anchor>(
            html`<vitals-a variant="${variant}">click</vitals-a>`,
          ),
        );
      });
    });

    it(`is accessible when disabled`, async () => {
      await assertAccessibility(
        await fixture<Anchor>(html`<vitals-a disabled>click</vitals-a>`),
      );
    });

    it('sets aria-disabled to match disabled state', async () => {
      const el = await fixture<Anchor>(html`<vitals-a>click</vitals-a>`);
      expect(getA(el)?.getAttribute('aria-disabled')).toBe('false');

      el.disabled = true;
      await elementUpdated(el);
      expect(getA(el)?.getAttribute('aria-disabled')).toBe('true');
    });

    it('sets tabindex to match disabled state', async () => {
      const el = await fixture<Anchor>(html`<vitals-a>click</vitals-a>`);
      expect(getA(el)?.getAttribute('tabindex')).toBe('0');

      el.disabled = true;
      await elementUpdated(el);
      expect(getA(el)?.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('title', () => {
    it(`has default empty title`, async () => {
      const el = await fixture<Anchor>(html`<vitals-a>click</vitals-a>`);
      expect(el.title).toBe('');
      expect(getA(el)?.getAttribute('title')).toBe('');
    });

    it(`reflects title as an 'a' attribute`, async () => {
      const el = await fixture<Anchor>(
        html`<vitals-a title="hello">click</vitals-a>`,
      );

      expect(el.title).toBe('hello');
      expect(getA(el)?.getAttribute('title')).toBe('hello');
    });
  });

  describe('variant', () => {
    it(`has default variant "brand"`, async () => {
      const el = await fixture<Anchor>(html`<vitals-a>click</vitals-a>`);
      expect(el.variant).toBe('brand');
      expect(el.getAttribute('variant')).toBe('brand');
    });

    it(`reflects variant to an attribute`, async () => {
      const el = await fixture<Anchor>(
        html`<vitals-a variant="danger">click</vitals-a>`,
      );

      expect(el.variant).toBe('danger');
      expect(el.getAttribute('variant')).toBe('danger');
    });
  });

  describe('appearance', () => {
    it(`has default appearance "filled"`, async () => {
      const el = await fixture<Anchor>(html`<vitals-a>click</vitals-a>`);
      expect(el.appearance).toBe('filled');
      expect(el.getAttribute('appearance')).toBe('filled');
    });

    it(`reflects appearance to an attribute`, async () => {
      const el = await fixture<Anchor>(
        html`<vitals-a appearance="link">click</vitals-a>`,
      );

      expect(el.appearance).toBe('link');
      expect(el.getAttribute('appearance')).toBe('link');
    });
  });

  describe('size', () => {
    it(`has default size "m"`, async () => {
      const el = await fixture<Anchor>(html`<vitals-a>click</vitals-a>`);
      expect(el.size).toBe('m');
      expect(el.getAttribute('size')).toBe('m');
    });

    it(`reflects size to an attribute`, async () => {
      const el = await fixture<Anchor>(
        html`<vitals-a size="s">click</vitals-a>`,
      );

      expect(el.size).toBe('s');
      expect(el.getAttribute('size')).toBe('s');
    });
  });

  describe('disabled', () => {
    it(`is not disabled by default`, async () => {
      const el = await fixture<Anchor>(html`<vitals-a>click</vitals-a>`);
      expect(el.disabled).toBe(false);
      expect(el.getAttribute('disabled')).toBeNull();
    });

    it(`reflects disabled as a boolean attribute`, async () => {
      const el = await fixture<Anchor>(
        html`<vitals-a disabled>click</vitals-a>`,
      );

      expect(el.disabled).toBe(true);
      expect(el.getAttribute('disabled')).toBe('');
    });

    it(`doesn't emit a click event when disabled`, async () => {
      const el = await fixture<Anchor>(
        html`<vitals-a disabled>click</vitals-a>`,
      );
      const clickHandler = vi.fn();

      el.addEventListener('click', clickHandler);
      el.click();

      expect(clickHandler).not.toHaveBeenCalled();
    });

    describe('href', () => {
      it(`has no default value`, async () => {
        const el = await fixture<Anchor>(html`<vitals-a>click</vitals-a>`);
        expect(el.href).toBeUndefined();
      });

      it(`reflects href as an 'a' attribute`, async () => {
        const el = await fixture<Anchor>(
          html`<vitals-a href="/url">click</vitals-a>`,
        );

        expect(el.href).toBe('/url');
        expect(getA(el)?.getAttribute('href')).toBe('/url');
      });
    });

    describe('target', () => {
      it(`has default target "_self"`, async () => {
        const el = await fixture<Anchor>(html`<vitals-a>click</vitals-a>`);
        expect(el.target).toBe('_self');
        expect(getA(el)?.getAttribute('target')).toBe('_self');
      });

      it(`reflects target as an 'a' attribute`, async () => {
        const el = await fixture<Anchor>(
          html`<vitals-a target="_blank">click</vitals-a>`,
        );

        expect(el.target).toBe('_blank');
        expect(getA(el)?.getAttribute('target')).toBe('_blank');
      });
    });

    describe('rel', () => {
      it(`has no default value`, async () => {
        const el = await fixture<Anchor>(html`<vitals-a>click</vitals-a>`);
        expect(el.href).toBeUndefined();
      });

      it(`reflects rel as an 'a' attribute`, async () => {
        const el = await fixture<Anchor>(
          html`<vitals-a rel="help">click</vitals-a>`,
        );

        expect(el.rel).toBe('help');
        expect(getA(el)?.getAttribute('rel')).toBe('help');
      });
    });

    describe('download', () => {
      it(`has no default value`, async () => {
        const el = await fixture<Anchor>(html`<vitals-a>click</vitals-a>`);
        expect(el.href).toBeUndefined();
      });

      it(`reflects download as an 'a' attribute`, async () => {
        const el = await fixture<Anchor>(
          html`<vitals-a download="file.pdf">click</vitals-a>`,
        );

        expect(el.download).toBe('file.pdf');
        expect(getA(el)?.getAttribute('download')).toBe('file.pdf');
      });
    });
  });

  describe('events', () => {
    it(`emits focus and blur when the a is focused and blurred`, async () => {
      const el = await fixture<Anchor>(html`<vitals-a>click</vitals-a>`);
      const focusHandler = vi.fn();
      const blurHandler = vi.fn();

      el.addEventListener('focus', focusHandler);
      el.addEventListener('blur', blurHandler);
      el.focus();
      el.blur();

      expect(focusHandler).toHaveBeenCalledTimes(1);
      expect(blurHandler).toHaveBeenCalledTimes(1);
    });

    it(`emits a click event when calling click()`, async () => {
      const el = await fixture<Anchor>(html`<vitals-a>click</vitals-a>`);
      const clickHandler = vi.fn();

      el.addEventListener('click', clickHandler);
      el.click();

      expect(clickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
