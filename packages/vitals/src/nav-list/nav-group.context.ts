import { ContextRoot, createContext } from '@lit/context';

import { NavGroupRenderer } from './nav-group.renderer';

/**
 * `Symbol.for` makes the key identical across separately bundled copies of the library, which is required when
 * micro-frontends bring their own version.
 */
export const navGroupRendererContext = createContext<NavGroupRenderer>(
  Symbol.for('mh.nav-group-renderer'),
);

/**
 * Groups are usually upgraded before the nav-list/nav-menu that contains them (document order of `define` calls), so
 * their first context request goes unanswered. A `ContextRoot` remembers unanswered requests and replays them when a
 * provider connects later. One root per page is enough, also when several library copies are loaded.
 */
const ROOT_FLAG = Symbol.for('mh.nav-group-context-root');

if (typeof window !== 'undefined') {
  const globals = window as unknown as { [ROOT_FLAG]?: boolean };

  if (!globals[ROOT_FLAG]) {
    globals[ROOT_FLAG] = true;
    new ContextRoot().attach(document.documentElement);
  }
}
