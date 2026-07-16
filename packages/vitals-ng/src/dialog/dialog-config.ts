import { Injector } from '@angular/core';

import { Dialog } from '@smals-belgium-shared/vitals/dialog';

import type { Inputs } from './inputs';

/** Configuration for a Dialog that is opened through DialogService. */
export type DialogConfig<Component> = Partial<
  Pick<Dialog, 'variant' | 'closedby'>
> & {
  /** Data made available to the opened component through its inputs. */
  inputs?: Inputs<Component>;

  /** Injector used to instantiate the opened component; defaults to the service's injector. */
  injector?: Injector;

  /**
   * Element the dialog is appended to. Defaults to the host element that provided this
   * service (see `DialogService`'s class doc), falling back to `document.body`.
   */
  container?: HTMLElement;
};
