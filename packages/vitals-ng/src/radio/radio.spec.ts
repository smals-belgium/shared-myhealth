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
          [(ngModel)]="value"
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
    { key: 'x', label: 'Other' },
  ];
  value: string | null = null;
  form = viewChild.required<NgForm>('form');
}

describe('radio form integration', () => {
  it(`keeps exactly the clicked radio checked when used with ngModel [MAGS-1813]`, async () => {
    const fixture = TestBed.createComponent(RadioForm);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const radios = (fixture.nativeElement as HTMLElement).querySelectorAll(
      'mh-radio',
    );

    const radioGroupComplete = async () => {
      await fixture.whenStable();
      fixture.detectChanges();
      await Promise.all(Array.from(radios).map(radio => radio.updateComplete));
    };

    for (const index of [0, 1, 2, 0, 0, 2, 1, 1]) {
      radios.item(index).click();
      // eslint-disable-next-line no-await-in-loop -- the point is to have clicks in sequence, not in parallel
      await radioGroupComplete();

      expect(fixture.componentInstance.value).toBe(['m', 'f', 'x'][index]);
      expect(
        Array.from(radios).map(radio => radio.hasAttribute('checked')),
      ).toEqual([0, 1, 2].map(checkedIndex => checkedIndex === index));
    }
  });

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
