export class CalloutToggledEvent extends Event {
  readonly open: boolean;

  constructor(open: boolean) {
    super('mh-callout-toggled', {
      bubbles: true,
      cancelable: false,
      composed: true,
    });

    this.open = open;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'mh-callout-toggled': CalloutToggledEvent;
  }
}
