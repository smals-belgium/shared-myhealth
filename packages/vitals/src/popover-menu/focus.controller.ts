import type { OpenCloseHost } from '../core/controller/open-close.controller';
import { propUpdatedEffect } from '../core/controller/prop-updated.effect';

import { getFirstEnabledOption } from './menu-item.selectors';

/** When opened, activate the first enabled menu item, or the menu itself when there is none. */
export const focusController = (host: OpenCloseHost) =>
  propUpdatedEffect(host, 'open', () => {
    if (host.open) (getFirstEnabledOption(host) ?? host).focus();
  });
