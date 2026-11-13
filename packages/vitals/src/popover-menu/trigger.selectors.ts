export const root = (host: Node) =>
  host.getRootNode() as (Document | ShadowRoot) & HTMLElement;

export const triggers = (host: Element) =>
  root(host).querySelectorAll<HTMLElement>(`[popovertarget="${host.id}"]`);

export const getEventTrigger = (host: Element, event: Event) => {
  const linked = new Set<EventTarget>(triggers(host));

  return event
    .composedPath()
    .map(node => node as HTMLElement)
    .find(node => linked.has(node));
};
