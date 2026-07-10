import { Directive, input } from '@angular/core';

import type { SkeletonAnimation } from '@smals-belgium-shared/vitals/skeleton';
import { DEFAULT_SKELETON_COUNT } from '@smals-belgium-shared/vitals/skeleton';

@Directive({
  selector: 'mh-skeleton',
  host: {
    '[attr.animation]': 'animation()',
    '[attr.count]': 'count()',
  },
})
export class Skeleton {
  readonly animation = input<SkeletonAnimation>('sheen');
  readonly count = input(DEFAULT_SKELETON_COUNT);
}
