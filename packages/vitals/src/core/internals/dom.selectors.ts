export const root = (host: Node) =>
  host.getRootNode() as (Document | ShadowRoot) & HTMLElement;
