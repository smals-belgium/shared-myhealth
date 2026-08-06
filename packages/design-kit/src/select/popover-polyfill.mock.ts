type ToggleTransition = {
  oldState: 'open' | 'closed';
  newState: 'open' | 'closed';
};

type ToggleEventInit = ToggleTransition & {
  type: 'beforetoggle' | 'toggle';
};

const dispatchToggle = (
  el: HTMLElement,
  { type, oldState, newState }: ToggleEventInit,
) => {
  el.dispatchEvent(new ToggleEvent(type, { oldState, newState }));
};

export const polyfillPopover = () => {
  if (!HTMLElement.prototype.showPopover)
    HTMLElement.prototype.showPopover = function showPopover() {
      if (this.hasAttribute('popover-open')) return;
      this.setAttribute('popover-open', '');

      const state: ToggleTransition = { oldState: 'closed', newState: 'open' };
      dispatchToggle(this, { type: 'beforetoggle', ...state });
      dispatchToggle(this, { type: 'toggle', ...state });
    };

  if (!HTMLElement.prototype.hidePopover)
    HTMLElement.prototype.hidePopover = function hidePopover() {
      if (!this.hasAttribute('popover-open')) return;
      this.removeAttribute('popover-open');

      const state: ToggleTransition = { oldState: 'open', newState: 'closed' };
      dispatchToggle(this, { type: 'beforetoggle', ...state });
      dispatchToggle(this, { type: 'toggle', ...state });
    };

  if (!HTMLElement.prototype.togglePopover)
    HTMLElement.prototype.togglePopover = function togglePopover(
      force?: boolean,
    ) {
      const shouldOpen = force ?? !this.hasAttribute('popover-open');

      if (shouldOpen) this.showPopover();
      else this.hidePopover();

      return this.hasAttribute('popover-open');
    };
};
