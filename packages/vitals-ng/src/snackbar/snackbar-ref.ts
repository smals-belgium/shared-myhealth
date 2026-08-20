import { Subject } from 'rxjs';

import type {
  Snackbar,
  SnackbarDismissedEvent,
  SnackbarDismissReason,
} from '@smals-belgium-shared/vitals/snackbar';

/**
 * Handle to an opened snackbar.
 */
export class SnackbarRef {
  readonly #afterOpened = new Subject<void>();
  readonly #afterClosed = new Subject<SnackbarDismissReason>();
  readonly afterOpened$ = this.#afterOpened.asObservable();
  readonly afterClosed$ = this.#afterClosed.asObservable();

  constructor(readonly element: Snackbar) {
    const onAfterOpened = () => {
      this.#afterOpened.next();
      this.#afterOpened.complete();
    };

    const onAfterClosed = (event: SnackbarDismissedEvent) => {
      this.#afterClosed.next(event.reason);
      this.#afterClosed.complete();
      this.element.removeEventListener('mh-snackbar-opened', onAfterOpened);
      this.element.removeEventListener('mh-snackbar-dismissed', onAfterClosed);
    };

    element.addEventListener('mh-snackbar-opened', onAfterOpened);
    element.addEventListener('mh-snackbar-dismissed', onAfterClosed);
  }

  readonly close = () => this.element.dismiss();
}
