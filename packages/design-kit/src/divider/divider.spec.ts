import { elementUpdated, expect, fixture } from '@open-wc/testing';
import { html } from 'lit';

import './divider';
import type { Divider } from './divider.js';

describe('divider', () => {
  const setup = (tpl = html`<mh-divider></mh-divider>`): Promise<Divider> =>
    fixture(tpl);

  describe('accessibility', () => {
    it(`passes accessibility tests`, async () => {
      const el = await setup();
      document.body.appendChild(el);
      expect(el).to.be.accessible();
    });

    it(`has role="separator"`, async () => {
      expect((await setup()).getAttribute('role')).to.equal('separator');
    });

    it('sets aria-orientation to match orientation', async () => {
      expect((await setup()).getAttribute('aria-orientation')).to.equal(
        'horizontal',
      );
    });
  });

  describe('orientation', () => {
    it(`has default orientation "horizontal"`, async () => {
      const el = await setup();

      expect(el.orientation).to.equal('horizontal');
      expect(el.getAttribute('orientation')).to.equal('horizontal');
    });

    it(`reflects orientation to an attribute`, async () => {
      const el = await setup(
        html`<mh-divider orientation="vertical"></mh-divider>`,
      );

      expect(el.orientation).to.equal('vertical');
      expect(el.getAttribute('orientation')).to.equal('vertical');
    });

    it(`updates aria-orientation when orientation changes`, async () => {
      const el = await setup();
      el.orientation = 'vertical';
      await elementUpdated(el);

      expect(el.getAttribute('aria-orientation')).to.equal('vertical');
    });
  });

  describe('loudness', () => {
    it(`has default loudness "normal"`, async () => {
      const el = await setup();

      expect(el.loudness).to.equal('normal');
      expect(el.getAttribute('loudness')).to.equal('normal');
    });

    it(`reflects loudness to an attribute`, async () => {
      const el = await setup(html`<mh-divider loudness="quiet"></mh-divider>`);

      expect(el.loudness).to.equal('quiet');
      expect(el.getAttribute('loudness')).to.equal('quiet');
    });
  });
});
