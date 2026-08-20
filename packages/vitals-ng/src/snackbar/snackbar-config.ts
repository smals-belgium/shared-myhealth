import { Snackbar } from '@smals-belgium-shared/vitals/snackbar';

/** Configuration for a Snackbar that is opened through SnackbarService. */
export type SnackbarConfig = Partial<
  Pick<Snackbar, 'action' | 'politeness' | 'duration'>
> & {
  message: string;

  /**
   * Element the dialog is appended to. Defaults to the host element that provided this
   * service (see `DialogService`'s class doc), falling back to `document.body`.
   */
  container?: HTMLElement;
};
