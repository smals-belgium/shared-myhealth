import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { BUTTON } from '.';

@Component({
  imports: [FormsModule, BUTTON],
  template: `
    <form (ngSubmit)="submit()">
      <mh-button type="submit">submit</mh-button>
    </form>
  `,
})
class FormTest {
  readonly submit = vi.fn();
}

describe('button', () => {
  describe('form integration', () => {
    it(`submits a form`, async () => {
      const fixture = TestBed.createComponent(FormTest);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const { submit } = fixture.componentInstance;

      const button = fixture.nativeElement.querySelector('mh-button');
      await button.updateComplete;
      button.click();

      expect(submit).toHaveBeenCalled();
    });
  });
});
