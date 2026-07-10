import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

/**
 * JSDOM does not implement setFormValue. In the Lit component tests we stub it per test because we need to test
 * native form integration there. But Angular's form value and validation do not use any native stuff. So we can
 * globally ignore whatever happens with the native forms.
 */
if (!ElementInternals.prototype.setFormValue)
  ElementInternals.prototype.setFormValue = function setFormValue() {
    // No-op: form value tracking isn't exercised via the native form data API in Angular form intagration tests.
  };

setupTestBed();
