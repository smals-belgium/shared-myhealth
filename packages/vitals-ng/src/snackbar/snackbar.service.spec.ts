import { Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';

// eslint-disable-next-line import/no-unassigned-import -- the service transitively uses the mh-snackbar Lit component
import '@smals-belgium-shared/vitals/snackbar';
import { textContent, defaultSlot } from '@smals-belgium-shared/vitals/testing';

import { SnackbarService } from './snackbar.service';

/** Flush the Lit dialog component's `updateComplete` promise resolution. */
const flush = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

describe('SnackbarService', () => {
  afterEach(() => {
    document.querySelectorAll('mh-snackbar').forEach(el => el.remove());
  });

  it('creates a mh-snackbar with the given message and appends it to the DOM', async () => {
    const service = TestBed.inject(SnackbarService);
    service.open({ message: 'Saved successfully' });
    await flush();

    const snackbarEl = document.body.querySelector('mh-snackbar');
    expect(snackbarEl).toBeTruthy();
    const slot = defaultSlot(snackbarEl!);
    expect(slot && textContent(slot)).toBe('Saved successfully');
  });

  it('opens the snackbar once rendered and notifies afterOpened', async () => {
    const service = TestBed.inject(SnackbarService);
    const ref = service.open({ message: 'Hello' });
    const opened = vi.fn();
    ref.afterOpened$.subscribe(opened);

    await flush();

    const snackbarEl = document.body.querySelector('mh-snackbar')!;
    expect((snackbarEl as unknown as { isOpen: boolean }).isOpen).toBe(true);
    expect(opened).toHaveBeenCalledOnce();
  });

  it('sets politeness and duration on the element when given', async () => {
    const service = TestBed.inject(SnackbarService);
    service.open({ message: 'Hello', politeness: 'assertive', duration: 5000 });
    await flush();

    const snackbarEl = document.body.querySelector(
      'mh-snackbar',
    ) as unknown as {
      politeness: string;
      duration: number;
    };
    expect(snackbarEl.politeness).toBe('assertive');
    expect(snackbarEl.duration).toBe(5000);
  });

  it('falls back to the default politeness and duration when not given', async () => {
    const service = TestBed.inject(SnackbarService);
    service.open({ message: 'Hello' });
    await flush();

    const snackbarEl = document.body.querySelector(
      'mh-snackbar',
    ) as unknown as {
      politeness: string;
      duration: number;
    };
    expect(snackbarEl.politeness).toBe('polite');
    expect(snackbarEl.duration).toBe(3000);
  });

  it('closes the snackbar and reports the reason via afterClosed, then cleans up the DOM', async () => {
    const service = TestBed.inject(SnackbarService);
    const ref = service.open({ message: 'Hello' });
    await flush();

    const closed = vi.fn();
    ref.afterClosed$.subscribe(closed);

    ref.close();
    await flush();

    expect(closed).toHaveBeenCalledWith('programmatic');
    expect(document.body.querySelector('mh-snackbar')).toBeNull();
  });

  it('appends the snackbar into the ElementRef of the component that provides SnackbarService', async () => {
    @Component({
      selector: 'host-cmp',
      template: '',
      providers: [SnackbarService],
    })
    class HostComponent {
      readonly service = inject(SnackbarService);
    }

    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    fixture.componentInstance.service.open({ message: 'Hello' });
    await flush();

    const hostEl = fixture.nativeElement as HTMLElement;
    const snackbarEl = hostEl.querySelector('mh-snackbar');
    expect(snackbarEl).toBeTruthy();
    expect(snackbarEl!.parentElement).toBe(hostEl);
  });

  it('appends the snackbar to an explicit container when given', async () => {
    const container = document.createElement('div');
    document.body.append(container);

    const service = TestBed.inject(SnackbarService);
    service.open({ message: 'Hello', container });
    await flush();

    expect(container.querySelector('mh-snackbar')).toBeTruthy();

    container.remove();
  });
});
