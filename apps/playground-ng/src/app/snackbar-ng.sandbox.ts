import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BUTTON } from '@smals-belgium-shared/vitals-ng/button';
import { ICON_BUTTON } from '@smals-belgium-shared/vitals-ng/icon-button';
import {
  SNACKBAR,
  SnackbarService,
} from '@smals-belgium-shared/vitals-ng/snackbar';

@Component({
  imports: [BUTTON, SNACKBAR, ICON_BUTTON],
  template: `
    <h2>Dialog</h2>
    <mh-button (click)="inlineSnackbar.open()">Open inline snackbar</mh-button>

    <mh-snackbar
      #inlineSnackbar
      (mh-snackbar-opened)="log('mh-snackbar-opened', $event)"
      (mh-snackbar-dismissed)="log('mh-snackbar-dismissed', $event.reason)"
    >
      hello snackbar
    </mh-snackbar>

    <mh-button (click)="open()"> Open snackbar from service </mh-button>
  `,
  viewProviders: [SnackbarService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarSandbox {
  readonly #snackbar = inject(SnackbarService);

  protected readonly log = console.log;

  protected readonly open = () => {
    const ref = this.#snackbar.open({
      message: 'service snackbar',
    });

    ref.afterOpened$.subscribe(() => console.log('opened snackbar ref'));
    ref.afterClosed$.subscribe(reason =>
      console.log(`closed snackbar with reason: ${reason}`),
    );
  };
}
