export const polyfillToggleEvent = () => {
  class MockToggleEvent extends Event {
    oldState: string;
    newState: string;

    constructor(
      type: string,
      init?: EventInit & {
        oldState?: string;
        newState?: string;
      },
    ) {
      super(type, init);

      this.oldState = init?.oldState ?? 'closed';
      this.newState = init?.newState ?? 'open';
    }
  }

  window.ToggleEvent = MockToggleEvent;
};
