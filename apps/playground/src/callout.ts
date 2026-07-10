import type {
  Callout,
  CalloutToggledEvent,
  ExpandableCallout,
} from '@myhealth/design-kit';

(document.querySelector<Callout>('#filled-info') as Callout).closable = false;

const expandable = (id: string) =>
  document.querySelector<ExpandableCallout>(`#${id}`);

const wireToggle = (triggerId: string, calloutId: string) => {
  document
    .querySelector(`#${triggerId}`)
    ?.addEventListener('click', () => expandable(calloutId)?.toggle());

  expandable(calloutId)?.addEventListener(
    'mh-callout-toggled',
    (event: CalloutToggledEvent) => {
      console.log(`"${calloutId}" toggled open: ${String(event.open)}`);
    },
  );
};

document.addEventListener('mh-callout-closed', event => {
  const callout = event.target as HTMLElement;
  console.log(`"${callout.id}" dismissed`);
});

wireToggle('toggle-demo-expansion', 'demo-expansion');
