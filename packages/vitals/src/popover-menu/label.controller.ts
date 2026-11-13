import type { LitElement } from 'lit';

import { propUpdatedEffect } from '../core/controller/prop-updated.effect';
import { ErrorEvent } from '../core/event/error.event';

type LabelHost = LitElement & { label: string };

/**
 * Reflect the required `label` property as the accessible name (`aria-label`) of the host,
 * since the role that needs a name lives on the host itself.
 */
export const labelController = (host: LabelHost) =>
  propUpdatedEffect(host, 'label', () => {
    if (host.label.trim()) host.setAttribute('aria-label', host.label);
    else
      host.dispatchEvent(
        new ErrorEvent(
          'A popover-menu must have a "label" property for accessibility reasons',
        ),
      );
  });
