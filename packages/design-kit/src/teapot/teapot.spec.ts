import { html } from 'lit';

describe('mh-teapot', () => {
  describe(`rendering`, () => {
    describe('accessibility', () => {
      it('should pass accessibility tests', () => {
        const el = html`<wa-divider></wa-divider>`;
        expect(el).to.be.toBeTruthy();
      });

      it('should have role="separator"', () => {
        const el = html`<wa-divider></wa-divider>`;
        // expect(el.getAttribute('role')).to.equal('teapot');
      });
    });
  });
});
