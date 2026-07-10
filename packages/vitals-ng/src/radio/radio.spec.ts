import { Component, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';

import { RADIO } from '.';

@Component({
  template: `
    <form #form="ngForm">
      <mh-radio
        name="gender"
        value="m"
        required
        ngModel
      >
        Male
      </mh-radio>

      <mh-radio
        name="gender"
        value="f"
        required
        ngModel
      >
        Female
      </mh-radio>
    </form>
  `,
  imports: [FormsModule, RADIO],
})
class RadioForm {
  value = false;
  form = viewChild.required<NgForm>('form');
}

describe('radio form integration', () => {
  it('marks the form valid when a radio is selected', async () => {
    const fixture = TestBed.createComponent(RadioForm);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const form = fixture.componentInstance.form();
    expect(form.valid).toBe(false);

    const radio = fixture.nativeElement.querySelector('mh-radio');
    radio.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(form.valid).toBe(true);
  });
});
