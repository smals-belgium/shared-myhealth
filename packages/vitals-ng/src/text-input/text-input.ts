/* eslint-disable no-underscore-dangle -- Angular internals */
import { Directive, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR, DefaultValueAccessor } from '@angular/forms';

import type {
  AutoCapitalize,
  EnterKeyHint,
  InputMode,
  TextInputSize,
  TextInputType,
} from '@smals-belgium-shared/vitals/text-input';

/**
 * These methods exist on DefaultValueAccessor but are stripped from the types for some reason.
 * We add them back, so we can access them.
 */
type DvaInternals = {
  _handleInput(value: unknown): void;
  _compositionStart(): void;
  _compositionEnd(value: unknown): void;
};

@Directive({
  selector: 'mh-text-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInput),
      multi: true,
    },
  ],
  host: {
    '[attr.title]': 'title()',
    '[attr.type]': 'type()',
    '[attr.size]': 'size()',
    '[attr.placeholder]': 'placeholder()',
    '[attr.autocapitalize]': 'autocapitalize()',
    '[attr.autocomplete]': 'autocomplete()',
    '[attr.autofocus]': 'autofocus() ? "" : null',
    '[attr.spellcheck]': 'spellcheck() ? "" : null',
    '[attr.enterkeyhint]': 'enterkeyhint()',
    '[attr.inputmode]': 'inputmode()',
    '[attr.help]': 'help()',
    '[attr.hint]': 'hint()',
    '(input)': 'handleInput($any($event.target).value)',
    '(blur)': 'onTouched()',
    '(compositionstart)': 'compositionStart()',
    '(compositionend)': 'compositionEnd($any($event.target).value)',
  },
})
export class TextInput extends DefaultValueAccessor {
  readonly title = input('');
  readonly type = input<TextInputType>('text');
  readonly size = input<TextInputSize>('m');
  readonly placeholder = input<string>();
  readonly disabled = input(false);
  readonly autocapitalize = input<AutoCapitalize>('off');
  readonly autocomplete = input<string>();
  readonly autofocus = input(false);
  readonly spellcheck = input(false);
  readonly enterkeyhint = input<EnterKeyHint>();
  readonly inputmode = input<InputMode>();
  readonly help = input<string>();
  readonly hint = input<string>();

  readonly #dva = this as unknown as DvaInternals;
  protected readonly handleInput = this.#dva._handleInput.bind(this);
  protected readonly compositionStart = this.#dva._compositionStart.bind(this);
  protected readonly compositionEnd = this.#dva._compositionEnd.bind(this);
}
