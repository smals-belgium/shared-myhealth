/* eslint-disable max-classes-per-file */
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { filter } from 'rxjs';

import { BUTTON } from '@smals-belgium-shared/vitals-ng/button';
import { DIALOG, DialogService } from '@smals-belgium-shared/vitals-ng/dialog';
import { ICON_BUTTON } from '@smals-belgium-shared/vitals-ng/icon-button';

@Component({
  imports: [BUTTON],
  template: `
    hello {{ message() }}

    <mh-button
      mh-dialog-close
      slot="actions"
      appearance="outlined"
    >
      cancel
    </mh-button>

    <mh-button
      slot="actions"
      (click)="closeDialog.emit({ data: message() })"
    >
      close
    </mh-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentDialog {
  readonly message = input.required<string>();
  readonly closeDialog = output<{ data: string }>();
}

@Component({
  imports: [BUTTON, DIALOG, ICON_BUTTON],
  template: `
    <h2>Dialog</h2>
    <mh-button (click)="inlineDialog.showModal()">Open inline dialog</mh-button>

    <mh-dialog
      #inlineDialog
      aria-label="Delete item"
      (close)="log('close', $event)"
      (cancel)="log('cancel', $event)"
      (mh-after-opened)="log('mh-after-opened', $event)"
      (mh-after-closed)="log('mh-after-closed', $event.result)"
    >
      <h2 slot="header-title">Delete item?</h2>
      <mh-icon-button
        mh-dialog-close
        slot="header-actions"
        name="close"
        label="Close dialog"
      ></mh-icon-button>
      <p>
        This action cannot be undone. Are you sure you want to permanently
        delete this item?
      </p>
      <mh-button
        mh-dialog-close
        slot="actions"
        appearance="outlined"
      >
        Cancel
      </mh-button>
      <mh-button
        [mh-dialog-close]="true"
        slot="actions"
        variant="danger"
      >
        Delete
      </mh-button>
    </mh-dialog>

    <mh-button (click)="componentDialog()">Open component dialog</mh-button>
  `,
  viewProviders: [DialogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogSandbox {
  readonly #dialog = inject(DialogService);

  protected readonly log = console.log;

  protected readonly componentDialog = () => {
    const ref = this.#dialog.open(ComponentDialog, {
      inputs: { message: 'component dialog' },
    });

    ref.afterOpened$.subscribe(() =>
      console.log('opened component dialog ref'),
    );
    ref.afterClosed$
      .pipe(filter(result => result.reason === 'native'))
      .subscribe(() => console.log('closed component dialog natively'));
    ref.afterClosed$
      .pipe(filter(result => result.reason === 'programmatic'))
      .subscribe(({ value }) =>
        console.log('closed component dialog ref with', value.data),
      );
  };
}
