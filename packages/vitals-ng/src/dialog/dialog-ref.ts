import { Subject } from 'rxjs';

import type {
  Dialog,
  DialogAfterClosedEvent,
} from '@smals-belgium-shared/vitals/dialog';

import { AfterClosed, resultStore } from './dialog-result-store';

/**
 * Handle to an opened dialog, injectable in the dynamically created content component so it can
 * close the dialog (optionally forwarding a result) without needing a reference to the DOM.
 */
export class DialogRef<R> {
  readonly #results = resultStore<R>();
  readonly #afterOpened = new Subject<void>();
  readonly #afterClosed = new Subject<AfterClosed<R>>();
  readonly afterOpened$ = this.#afterOpened.asObservable();
  readonly afterClosed$ = this.#afterClosed.asObservable();

  constructor(readonly element: Dialog) {
    const onAfterOpened = () => {
      this.#afterOpened.next();
      this.#afterOpened.complete();
    };

    const onAfterClosed = (event: DialogAfterClosedEvent) => {
      this.#afterClosed.next(this.#results.pop(event.result));
      this.#afterClosed.complete();
      this.element.removeEventListener('mh-after-opened', onAfterOpened);
      this.element.removeEventListener('mh-after-closed', onAfterClosed);
    };

    element.addEventListener('mh-after-opened', onAfterOpened);
    element.addEventListener('mh-after-closed', onAfterClosed);
  }

  readonly close = (result?: R) =>
    this.element.close(this.#results.push(result));
}
