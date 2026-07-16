import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[mh-dialog-close]',
  host: {
    '[attr.mh-dialog-close]': 'result()',
  },
})
export class DialogClose {
  readonly result = input<string | boolean>(undefined, {
    alias: 'mh-dialog-close',
  });

  constructor() {
    const { nativeElement } = inject<ElementRef<HTMLElement>>(ElementRef);
    if (!nativeElement.closest('mh-dialog'))
      throw new Error('mh-dialog-close used outside of mh-modal');
  }
}
