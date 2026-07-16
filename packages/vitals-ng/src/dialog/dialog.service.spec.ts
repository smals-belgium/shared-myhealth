/* eslint-disable max-classes-per-file */
import { Component, inject, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';

// eslint-disable-next-line import/no-unassigned-import -- the service transitively uses the mh-dialog Lit component
import '@smals-belgium-shared/vitals/dialog';

import { DialogRef } from './dialog-ref';
import { DialogService } from './dialog.service';

// JSDOM does not implement the native modal dialog APIs, so we polyfill what's needed for mh-dialog
beforeAll(() => {
  const proto = HTMLDialogElement.prototype;

  if (typeof proto.showModal !== 'function') {
    proto.showModal = function showModal() {
      this.open = true;
    };
    proto.close = function close() {
      if (!this.open) return;
      this.open = false;
      this.dispatchEvent(new Event('close'));
    };
  }
});

@Component({
  template: `<p>Hello {{ data() }}</p>`,
})
class TestContent {
  readonly dialogRef = inject(DialogRef);
  readonly data = input('');
}

/**
 * Flush double Promise resolution:
 *  - Lit dialog component initilisation
 *  - opening modal
 */
const flush = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

describe('DialogService', () => {
  afterEach(() => {
    document.querySelectorAll('mh-dialog').forEach(el => el.remove());
  });

  it('creates a mh-dialog and projects the content component into it', async () => {
    const service = TestBed.inject(DialogService);
    service.open(TestContent);
    await flush();

    const dialogEl = document.body.querySelector('mh-dialog');
    expect(dialogEl).toBeTruthy();
    expect(dialogEl!.querySelector('p')?.textContent).toBe('Hello ');
  });

  it('opens the native dialog once rendered and notifies afterOpened', async () => {
    const service = TestBed.inject(DialogService);
    const ref = service.open(TestContent);
    const opened = vi.fn();
    ref.afterOpened$.subscribe(opened);

    await flush();

    const dialogEl = document.body.querySelector('mh-dialog')!;
    expect((dialogEl as unknown as { open: boolean }).open).toBe(true);
    expect(opened).toHaveBeenCalledOnce();
  });

  it('passes data through as component inputs', async () => {
    const service = TestBed.inject(DialogService);
    service.open(TestContent, { inputs: { data: 'world' } });
    await flush();

    const dialogEl = document.body.querySelector('mh-dialog')!;
    expect(dialogEl.querySelector('p')?.textContent).toBe('Hello world');
  });

  it('closes the dialog and reports the result via afterClosed, then cleans up the DOM', async () => {
    const service = TestBed.inject(DialogService);
    const ref = service.open(TestContent);
    await flush();

    const closed = vi.fn();
    ref.afterClosed$.subscribe(closed);

    ref.close('confirmed');
    await flush();

    expect(closed).toHaveBeenCalledWith({
      reason: 'programmatic',
      value: 'confirmed',
    });
    expect(document.body.querySelector('mh-dialog')).toBeNull();
  });

  it('projects slotted top-level content as a direct child of mh-dialog (regression)', async () => {
    @Component({
      template: `
        <p>Body</p>
        <button slot="actions">Close</button>
      `,
    })
    class SlottedContent {}

    const service = TestBed.inject(DialogService);
    service.open(SlottedContent);
    await flush();

    const dialogEl = document.body.querySelector('mh-dialog')!;
    const actionButton = dialogEl.querySelector('[slot="actions"]');

    // Native slot projection only honours nodes that are *direct* children of the shadow host, so
    // the slotted element must not be nested inside an extra Angular-generated wrapper element.
    expect(actionButton).toBeTruthy();
    expect(actionButton!.parentElement).toBe(dialogEl);
  });

  it('appends the dialog into the ElementRef of the component that provides DialogService', async () => {
    @Component({
      selector: 'host-cmp',
      template: '',
      providers: [DialogService],
    })
    class HostComponent {
      readonly service = inject(DialogService);
    }

    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    fixture.componentInstance.service.open(TestContent);
    await flush();

    const hostEl = fixture.nativeElement as HTMLElement;
    const dialogEl = hostEl.querySelector('mh-dialog');
    expect(dialogEl).toBeTruthy();
    expect(dialogEl!.parentElement).toBe(hostEl);
  });
});
