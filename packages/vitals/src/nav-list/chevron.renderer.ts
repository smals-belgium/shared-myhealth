import { html, nothing } from 'lit';

export const renderChevron = (el: Element) =>
  el.localName === 'mh-nav-group'
    ? nothing
    : html`<mh-icon
        part="icon"
        name="chevron_right"
      >
      </mh-icon>`;
