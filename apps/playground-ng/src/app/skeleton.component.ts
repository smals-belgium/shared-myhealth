import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SKELETON } from '@myhealth/vitals-ng/skeleton';

@Component({
  selector: 'app-skeleton',
  imports: [SKELETON],
  template: ` <h2>Skeleton</h2>

    <h3>Animations</h3>
    <div class="skeleton-animations">
      <mh-skeleton animation="none"></mh-skeleton>
      <mh-skeleton animation="sheen"></mh-skeleton>
      <mh-skeleton animation="pulse"></mh-skeleton>
    </div>

    <h3>Paragraphs</h3>
    <!-- A single element renders five rows and announces "Loading" once. -->
    <mh-skeleton
      lang="en"
      animation="sheen"
      [count]="5"
    ></mh-skeleton>

    <h3>Avatars</h3>
    <div class="skeleton-avatars">
      <mh-skeleton
        class="square"
        animation="sheen"
      ></mh-skeleton>
      <mh-skeleton
        class="circle"
        animation="sheen"
      ></mh-skeleton>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {}
