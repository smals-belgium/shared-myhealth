import { nothing } from 'lit';
import type { CSSResult, TemplateResult } from 'lit';

export type NavGroupParts = {
  /** The slot containing the group's header. */
  header: TemplateResult;
  /** One `li` per item of the group. */
  items: TemplateResult[];
};

/**
 * Strategy through which a `nav-*` parent decides how its `mh-nav-group` children render.
 * Renderers must be stable references (define them once at module level): the context compares by identity.
 */
export type NavGroupRenderer = {
  /** Extra styles, adopted by the group next to its own. Scope them to the structure produced by `render`. */
  readonly styles?: readonly CSSResult[];
  render(parts: NavGroupParts): TemplateResult;
  /** Extra content rendered inside each item's `li`. */
  renderItemContent?(item: Element): TemplateResult | typeof nothing;
};
