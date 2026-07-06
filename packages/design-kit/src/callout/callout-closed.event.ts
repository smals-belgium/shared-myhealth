export class CalloutClosedEvent extends Event {
  constructor() {
    super('mh-callout-closed', {
      bubbles: true,
      cancelable: false,
      composed: true,
    });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'mh-callout-closed': CalloutClosedEvent;
  }
}
