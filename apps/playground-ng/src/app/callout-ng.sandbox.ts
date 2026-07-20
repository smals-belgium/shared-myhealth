import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BUTTON } from '@smals-belgium-shared/vitals-ng/button';
import { CALLOUT } from '@smals-belgium-shared/vitals-ng/callout';

@Component({
  imports: [BUTTON, CALLOUT],
  template: `
    <article>
      <h2>Callout</h2>

      <mh-callout
        appearance="outlined"
        variant="danger"
        [closable]="true"
      >
        I have a message for you
      </mh-callout>
    </article>

    <article>
      <h2>Expandable callout</h2>

      <mh-expandable-callout
        appearance="filled"
        variant="info"
        [open]="true"
      >
        <h3 slot="title">expando</h3>

        I still have a message for you

        <mh-button
          mh-callout-close
          slot="actions"
        >
          Mark as read
        </mh-button>
      </mh-expandable-callout>
    </article>
  `,
  styles: `
    article {
      width: fit-content;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutSandbox {}
