import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig).catch(console.error);

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
