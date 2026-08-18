import { Directive, input } from '@angular/core';

export type TextInputSlotName = 'start' | 'end' | 'help' | 'hint';

@Directive({
  selector: '[mh-text-input-slot]',
  host: {
    '[attr.slot]': 'slot()',
  },
})
export class TextInputSlot {
  readonly slot = input.required<TextInputSlotName>({
    alias: 'mh-text-input-slot',
  });
}
