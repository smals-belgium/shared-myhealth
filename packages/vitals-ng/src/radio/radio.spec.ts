import { Component, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';

import { RADIO } from '.';

@Component({
  template: `
    <form #form="ngForm">
      @for (gender of genders; track gender.key) {
        <mh-radio
          name="gender"
          required
          ngModel
          [value]="gender.key"
        >
          {{ gender.label }}
        </mh-radio>
      }
    </form>
  `,
  imports: [FormsModule, RADIO],
})
class RadioForm {
  genders = [
    { key: 'm', label: 'Male' },
    { key: 'f', label: 'Female' },
  ];
  value = false;
  form = viewChild.required<NgForm>('form');
}

describe('radio form integration', () => {
  it(`marks the form valid when a radio is selected`, async () => {
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

  it(`can select on reflected value attribute`, async () => {
    const fixture = TestBed.createComponent(RadioForm);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const radio = fixture.nativeElement.querySelector('mh-radio[value="f"]');
    expect(radio).not.toBeNull();
  });
});
