export class LoadEvent extends Event {
  constructor() {
    super('vitals-load', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'vitals-load': LoadEvent;
  }
}
