/* eslint-disable no-console */
import { DOCUMENT, inject, provideAppInitializer } from '@angular/core';

export const provideVitalsErrorLogger = () =>
  provideAppInitializer((document = inject(DOCUMENT)) => {
    console.warn(
      '[Vitals] Error logging activated. Exclude this provider from your production build.',
    );

    document.addEventListener('mh-error', event => {
      const { message, error } = event as Event & {
        message: string;
        error?: Error;
      };

      if (error) {
        console.warn(message);
        throw error;
      } else console.error(message);
    });
  });
