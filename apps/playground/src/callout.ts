import type { Callout, ExpandableCallout } from '@myhealth/design-kit';

(document.querySelector<Callout>('#filled-info') as Callout).closable = false;

const expandable = (id: string) =>
  document.querySelector<ExpandableCallout>(`#${id}`);

const wireToggle = (triggerId: string, calloutId: string) => {
  document
    .querySelector(`#${triggerId}`)
    ?.addEventListener('click', () => expandable(calloutId)?.toggle());

  expandable(calloutId)?.addEventListener('toggle', (event: ToggleEvent) => {
    console.log(
      `"${calloutId}" toggled from ${event.oldState} to ${event.newState}`,
    );
  });
};

document.addEventListener('mh-callout-closed', event => {
  const callout = event.target as HTMLElement;
  console.log(`"${callout.id}" dismissed`);
});

wireToggle('toggle-demo-expansion', 'demo-expansion');
