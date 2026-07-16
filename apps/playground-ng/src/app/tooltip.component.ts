import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BUTTON } from '@myhealth/vitals-ng/button';
import { TOOLTIP } from '@myhealth/vitals-ng/tooltip';

@Component({
  selector: 'app-tooltip',
  imports: [TOOLTIP, BUTTON],
  template: ` <article>
    <h2>Tooltip</h2>

    <h3>Placements</h3>
    <mh-tooltip
      content="Placement: top"
      placement="top"
    >
      <mh-button>top</mh-button>
    </mh-tooltip>
    <mh-tooltip
      content="Placement: bottom"
      placement="bottom"
    >
      <mh-button>bottom</mh-button>
    </mh-tooltip>
    <mh-tooltip
      content="Placement: left"
      placement="left"
    >
      <mh-button>left</mh-button>
    </mh-tooltip>
    <mh-tooltip
      content="Placement: right"
      placement="right"
    >
      <mh-button>right</mh-button>
    </mh-tooltip>

    <h3>Delays</h3>
    <mh-tooltip
      content="Shows after 500 ms"
      [showDelay]="500"
    >
      <mh-button>show delay</mh-button>
    </mh-tooltip>
    <mh-tooltip
      content="Hides after 500 ms"
      [hideDelay]="500"
    >
      <mh-button>Hides after 500 ms</mh-button>
    </mh-tooltip>
    <h3>Enabled</h3>
    <mh-tooltip content="This tooltip appears on hover">
      <mh-button>Enabled tooltip</mh-button>
    </mh-tooltip>
    <h3>Disabled</h3>
    <mh-tooltip
      content="You should not see this tooltip"
      disabled
    >
      <mh-button>Disabled tooltip</mh-button>
    </mh-tooltip>
  </article>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {}
