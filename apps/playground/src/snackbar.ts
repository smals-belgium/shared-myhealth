import type { Snackbar } from '@myhealth/design-kit';

const snackbar = (id: string) => document.querySelector<Snackbar>(`#${id}`);

document
  .querySelector('#openBasic')
  ?.addEventListener('click', () => snackbar('basicSnackbar')?.open());

document
  .querySelector('#openAction')
  ?.addEventListener('click', () => snackbar('actionSnackbar')?.open());

document
  .querySelector('#openAssertive')
  ?.addEventListener('click', () => snackbar('assertiveSnackbar')?.open());

const result = document.querySelector('#basicResult');
snackbar('basicSnackbar')?.addEventListener('mh-snackbar-dismissed', event => {
  if (result) result.textContent = `dismissed: "${event.reason}"`;
});
