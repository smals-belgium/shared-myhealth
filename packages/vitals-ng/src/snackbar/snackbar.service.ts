import { Injectable } from '@angular/core';

import {
  getContainerEl,
  overlay,
} from '@smals-belgium-shared/vitals-ng/cdk/overlay';

import { SnackbarConfig } from './snackbar-config';
import { SnackbarRef } from './snackbar-ref';

/** Create a Lit mh-snackbar instance from the config object. */
const createSnackbar = (config: SnackbarConfig) => {
  const el = document.createElement('mh-snackbar');
  el.textContent = config.message;
  if (config.action) el.action = config.action;
  if (config.politeness) el.politeness = config.politeness;
  if (config.duration) el.duration = config.duration;
  return new SnackbarRef(el);
};

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  readonly #container = getContainerEl();

  open(config: SnackbarConfig): SnackbarRef {
    const ref = createSnackbar(config);

    (config.container ?? this.#container).append(ref.element);
    ref.afterClosed$.subscribe(() => ref.element.remove());
    overlay(ref).ready(el => el.open());

    return ref;
  }
}
