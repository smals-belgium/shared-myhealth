/* eslint-disable @angular-eslint/prefer-inject -- overriding Angular built-ins: can't be helped */
import {
  Directive,
  ElementRef,
  Host,
  input,
  Optional,
  Renderer2,
} from '@angular/core';
import { NgSelectOption } from '@angular/forms';

import { Select } from './select';

@Directive({
  selector: 'mh-option',
  host: {
    // The value property is already bound by NgSelectOption
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.selected]': 'selected() ? "" : null',
  },
})
export class Option extends NgSelectOption {
  readonly disabled = input(false);
  readonly selected = input(false);

  // Overriding the constructor to inject our own Select CVA
  constructor(
    element: ElementRef,
    renderer: Renderer2,
    @Optional() @Host() select: Select,
  ) {
    super(element, renderer, select);
  }
}
