export class NavGroupOpenEvent extends Event {
  constructor() {
    super('mh-nav-group-open', {
      bubbles: true,
      cancelable: false,
      composed: true,
    });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'mh-nav-group-open': NavGroupOpenEvent;
  }
}
