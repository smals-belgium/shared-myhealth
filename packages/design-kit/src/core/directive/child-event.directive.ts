type EventPayload = {
  target: HTMLElement;
  value: string | null;
};

type ChildEventDirective = {
  name: string;
  onEvent: (event: EventPayload) => void;
};

export const childEventDirective =
  ({ name, onEvent }: ChildEventDirective) =>
  (event: MouseEvent) => {
    const target = event
      .composedPath()
      .find(
        (child): child is HTMLElement =>
          child instanceof HTMLElement && child.hasAttribute(name),
      );

    if (target) onEvent({ target, value: target.getAttribute(name) });
  };
