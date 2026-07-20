import { Directive, ElementRef, inject } from '@angular/core';

@Directive({ selector: '[mh-callout-close]' })
export class CalloutClose {
  constructor() {
    const { nativeElement } = inject<ElementRef<HTMLElement>>(ElementRef);
    if (!nativeElement.closest('mh-callout,mh-expandable-callout'))
      throw new Error(
        'mh-callout-close used outside of mh-callout or mh-expandable-callout',
      );
  }
}
