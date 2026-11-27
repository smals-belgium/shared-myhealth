import { html, unsafeCSS } from 'lit';

import { root } from '../core/internals';
import type { NavGroupRenderer } from '../nav-list/nav-group.renderer';

import { NavGroupOpenEvent } from './nav-group-open.event';
import groupStyles from './nav-menu-group.css?inline';

/**
 * When the group opens, announces it to the menu and scrolls the group into view so that it is fully visible.
 * The native `toggle` event neither bubbles nor leaves the group's shadow root, so the group announces that it opened
 * through an event the menu can listen to.
 */
const handleOpen = (event: Event) => {
  const details = event.currentTarget as HTMLDetailsElement;
  if (!details.open) return;
  root(details).host.dispatchEvent(new NavGroupOpenEvent());
  requestAnimationFrame(() => details.scrollIntoView({ block: 'nearest' }));
};

/** Renders a group as a collapsible panel: the header is the summary, the list is the details content. */
export const menuGroupRenderer: NavGroupRenderer = {
  styles: [unsafeCSS(groupStyles)],
  render: ({ header, items }) => html`
    <details @toggle=${handleOpen}>
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
