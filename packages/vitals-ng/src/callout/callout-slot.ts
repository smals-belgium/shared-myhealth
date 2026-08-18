import { Directive, input } from '@angular/core';

export type CalloutslotName = 'title' | 'actions';

@Directive({
  selector: '[mh-callout-slot]',
  host: {
    '[attr.slot]': 'slot()',
  },
})
export class CalloutSlot {
  readonly slot = input.required<CalloutslotName>({ alias: 'mh-callout-slot' });
}
