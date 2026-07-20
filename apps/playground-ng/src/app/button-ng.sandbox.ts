/* eslint-disable max-lines */
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BUTTON } from '@smals-belgium-shared/vitals-ng/button';
import { ICON } from '@smals-belgium-shared/vitals-ng/icon';

@Component({
  imports: [BUTTON, ICON],
  template: ` <article>
      <h2>Button</h2>

      <h3>Filled</h3>
      <mh-button onclick="console.log('click')">Click me</mh-button>
      <mh-button
        ><mh-icon
          name="add"
          slot="start"
        ></mh-icon
        >Add me</mh-button
      >
      <mh-button
        >Add me<mh-icon
          name="add"
          slot="end"
        ></mh-icon
      ></mh-button>
      <mh-button variant="danger">Click me</mh-button>
      <mh-button variant="danger"
        ><mh-icon
          name="add"
          slot="start"
        ></mh-icon
        >Add me</mh-button
      >
      <mh-button variant="danger"
        >Add me<mh-icon
          name="add"
          slot="end"
        ></mh-icon
      ></mh-button>
      <mh-button variant="warning">Click me</mh-button>
      <mh-button variant="warning"
        ><mh-icon
          name="add"
          slot="start"
        ></mh-icon
        >Add me</mh-button
      >
      <mh-button variant="warning"
        >Add me<mh-icon
          name="add"
          slot="end"
        ></mh-icon
      ></mh-button>
      <mh-button variant="success">Click me</mh-button>
      <mh-button variant="success"
        ><mh-icon
          name="add"
          slot="start"
        ></mh-icon
        >Add me</mh-button
      >
      <mh-button variant="success"
        >Add me<mh-icon
          name="add"
          slot="end"
        ></mh-icon
      ></mh-button>

      <h3>Outlined</h3>
      <mh-button appearance="outlined">Click me</mh-button>
      <mh-button appearance="outlined"
        ><mh-icon
          name="add"
          slot="start"
        ></mh-icon
        >Add me</mh-button
      >
      <mh-button appearance="outlined"
        >Add me<mh-icon
          name="add"
          slot="end"
        ></mh-icon
      ></mh-button>
      <mh-button
        appearance="outlined"
        variant="danger"
        >Click me</mh-button
      >
      <mh-button
        appearance="outlined"
        variant="danger"
        ><mh-icon
          name="add"
          slot="start"
        ></mh-icon
        >Add me</mh-button
      >
      <mh-button
        appearance="outlined"
        variant="danger"
        >Add me<mh-icon
          name="add"
          slot="end"
        ></mh-icon
      ></mh-button>
      <mh-button
        appearance="outlined"
        variant="warning"
        >Click me</mh-button
      >
      <mh-button
        appearance="outlined"
        variant="warning"
        ><mh-icon
          name="add"
          slot="start"
        ></mh-icon
        >Add me</mh-button
      >
      <mh-button
        appearance="outlined"
        variant="warning"
        >Add me<mh-icon
          name="add"
          slot="end"
        ></mh-icon
      ></mh-button>
      <mh-button
        appearance="outlined"
        variant="success"
        >Click me</mh-button
      >
      <mh-button
        appearance="outlined"
        variant="success"
        ><mh-icon
          name="add"
          slot="start"
        ></mh-icon
        >Add me</mh-button
      >
      <mh-button
        appearance="outlined"
        variant="success"
        >Add me<mh-icon
          name="add"
          slot="end"
        ></mh-icon
      ></mh-button>

      <h3>Link</h3>
      <mh-button appearance="link">Click me</mh-button>
      <mh-button appearance="link"
        ><mh-icon
          name="add"
          slot="start"
        ></mh-icon
        >Add me</mh-button
      >
      <mh-button appearance="link"
        >Add me<mh-icon
          name="add"
          slot="end"
        ></mh-icon
      ></mh-button>
      <mh-button
        appearance="link"
        variant="danger"
        >Click me</mh-button
      >
      <mh-button
        appearance="link"
        variant="danger"
        ><mh-icon
          name="add"
          slot="start"
        ></mh-icon
        >Add me</mh-button
      >
      <mh-button
        appearance="link"
        variant="danger"
        >Add me<mh-icon
          name="add"
          slot="end"
        ></mh-icon
      ></mh-button>
      <mh-button
        appearance="link"
        variant="warning"
        >Click me</mh-button
      >
      <mh-button
        appearance="link"
        variant="warning"
        ><mh-icon
          name="add"
          slot="start"
        ></mh-icon
        >Add me</mh-button
      >
      <mh-button
        appearance="link"
        variant="warning"
        >Add me<mh-icon
          name="add"
          slot="end"
        ></mh-icon
      ></mh-button>
      <mh-button
        appearance="link"
        variant="success"
        >Click me</mh-button
      >
      <mh-button
        appearance="link"
        variant="success"
        ><mh-icon
          name="add"
          slot="start"
        ></mh-icon
        >Add me</mh-button
      >
      <mh-button
        appearance="link"
        variant="success"
        >Add me<mh-icon
          name="add"
          slot="end"
        ></mh-icon
      ></mh-button>

      <h3>Disabled</h3>
      <mh-button
        [disabled]="true"
        onclick="console.log('click')"
        >Click me</mh-button
      >
      <mh-button
        appearance="outlined"
        [disabled]="true"
        >Click me</mh-button
      >
      <mh-button
        appearance="link"
        [disabled]="true"
        >Click me</mh-button
      >

      <h3>Small</h3>
      <mh-button
        size="s"
        onclick="console.log('click')"
        >Click me</mh-button
      >
      <mh-button size="s"
        ><mh-icon
          name="add"
          slot="start"
        ></mh-icon
        >Add me</mh-button
      >
      <mh-button size="s"
        >Add me<mh-icon
          name="add"
          slot="end"
        ></mh-icon
      ></mh-button>
      <mh-button
        size="s"
        appearance="outlined"
        >Click me</mh-button
      >
      <mh-button
        size="s"
        appearance="outlined"
        ><mh-icon
          name="add"
          slot="start"
        ></mh-icon
        >Add me</mh-button
      >
      <mh-button
        size="s"
        appearance="outlined"
        >Add me<mh-icon
          name="add"
          slot="end"
        ></mh-icon
      ></mh-button>
      <mh-button
        size="s"
        appearance="link"
        >Click me</mh-button
      >
      <mh-button
        size="s"
        appearance="link"
        ><mh-icon
          name="add"
          slot="start"
        ></mh-icon
        >Add me</mh-button
      >
      <mh-button
        size="s"
        appearance="link"
        >Add me<mh-icon
          name="add"
          slot="end"
        ></mh-icon
      ></mh-button>

      <h3>Loading</h3>
      <mh-button [loading]="true">Click me</mh-button>
      <mh-button
        [loading]="true"
        appearance="outlined"
        >Click me</mh-button
      >
      <mh-button
        [loading]="true"
        appearance="link"
        >Click me</mh-button
      >
    </article>

    <article>
      <h2>A</h2>
      <mh-a href="mijngezondheid.belgie.be">Click me</mh-a>
      <mh-a
        href="mijngezondheid.belgie.be"
        appearance="outlined"
        >Click me</mh-a
      >
      <mh-a
        href="mijngezondheid.belgie.be"
        appearance="link"
        >Click me</mh-a
      >
      <mh-a
        href="mijngezondheid.belgie.be"
        [disabled]="true"
        onclick="console.log('click')"
        >Click me</mh-a
      >
      <mh-a
        href="mijngezondheid.belgie.be"
        appearance="outlined"
        [disabled]="true"
        >Click me</mh-a
      >
      <mh-a
        href="mijngezondheid.belgie.be"
        appearance="link"
        [disabled]="true"
        >Click me</mh-a
      >
    </article>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSandbox {}
