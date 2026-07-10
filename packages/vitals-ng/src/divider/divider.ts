import { Directive, input } from '@angular/core';

import type { Loudness, Orientation } from '@smals-belgium-shared/vitals/core';

@Directive({
  selector: 'mh-divider',
  host: {
    '[attr.loudness]': 'loudness()',
    '[attr.orientation]': 'orientation()',
  },
})
export class Divider {
  readonly loudness = input<Loudness>('normal');
  readonly orientation = input<Orientation>('horizontal');
}
