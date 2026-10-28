import { LitElement, ReactiveController } from 'lit';

/** Properties to be implemented by a Lit component that can be used to trigger a `popover`. */
export type PopoverTriggerHost = LitElement & {
  /**
   * The unique ID of the target popover element, which will be resolved as
   * [popoverTargetElement](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/popoverTargetElement).
   */
  popoverTarget?: string;

  /** @see PopoverTargetAction */
  popoverTargetAction: PopoverTargetAction;
};

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/popoverTargetAction) */
export type PopoverTargetAction = 'toggle' | 'show' | 'hide';

/**
 * A Lit controller that adds `popover` trigger behaviour to custom Lit components that wrap native `popover` triggers
 * such as `<button>` and `<input>`.
 *
 * The connection between the trigger and the popover is resolved lazily (only when the trigger is clicked):
 * this ensures that all participants are rendered and ready to be used when it happens, and any cahnges in the
 * configuration are automatically taken into account.
 */
export const popoverTriggerController = (
  host: PopoverTriggerHost,
  trigger: PopoverTargetAttributes,
): ReactiveController => {
  // Safety check for component developers that made a mistake by force casting to a non-null type
  if (!(trigger as unknown))
    throw new Error(`
      Trigger element is undefined.
      You probably created the controller too soon:
      use 'firstUpdated' to ensure all elements are created
    `);

  const linkPopover = () => {
    if (!host.popoverTarget) return;

    const root = host.getRootNode() as Document | ShadowRoot;
    trigger.popoverTargetElement = root.getElementById(host.popoverTarget);
    trigger.popoverTargetAction = host.popoverTargetAction;
  };

  host.addEventListener('click', linkPopover, { capture: true });

  return {
    hostDisconnected() {
      host.removeEventListener('click', linkPopover);
    },
  };
};
