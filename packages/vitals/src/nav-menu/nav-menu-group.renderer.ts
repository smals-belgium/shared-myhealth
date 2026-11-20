import { html, unsafeCSS } from 'lit';

import type { NavGroupRenderer } from '../nav-list/nav-group.renderer';

import groupStyles from './nav-menu-group.css?inline';

/** Renders a group as a collapsible panel: the header is the summary, the list is the details content. */
export const menuGroupRenderer: NavGroupRenderer = {
  styles: [unsafeCSS(groupStyles)],
  render: ({ header, items }) => html`
    <details>
      <summary>
        ${header}
        <mh-icon
          part="icon"
          name="chevron_right"
        >
        </mh-icon>
      </summary>

      <ul part="list">
        ${items}
      </ul>
    </details>
  `,
};
