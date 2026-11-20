import { html } from 'lit';

import { renderChevron } from './chevron.renderer';
import { NavGroupRenderer } from './nav-group.renderer';

export const listGroupRenderer: NavGroupRenderer = {
  render: ({ header, items }) => html`
    ${header}
    <ul part="list">
      ${items}
    </ul>
  `,
  renderItemContent: renderChevron,
};
