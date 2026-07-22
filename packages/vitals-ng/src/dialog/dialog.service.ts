import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  ElementRef,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
  OnDestroy,
  OutputEmitterRef,
  Type,
} from '@angular/core';

import type { Dialog } from '@smals-belgium-shared/vitals/dialog';

import type { DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';

/** Create a Lit mh-dialog instance from the config object. */
const createDialog = <R>(config: DialogConfig<unknown>) => {
  const el = document.createElement('mh-dialog');
  if (config.variant) el.variant = config.variant;
  if (config.closedby) el.closedby = config.closedby;
  return new DialogRef<R>(el);
};

const dialogCreationError = (error: unknown) => {
  throw new Error('mh-dialog creation failed', { cause: error });
};

const getRemovedNodes = (mutations: MutationRecord[]) =>
  mutations.flatMap(mutation => [...mutation.removedNodes]);

type ClosableDialog<R> = {
  closeDialog: OutputEmitterRef<R>;
};

/**
 * The value type emitted by `Component`'s `closeDialog` output, i.e. what callers can pass to
 * `dialogRef.close()`. `never` if `Component` doesn't declare a `closeDialog` output at all.
 */
type CloseResult<Component> =
  Component extends ClosableDialog<infer R> ? R : never;

const isComponentRef = (ref: unknown): ref is ComponentRef<object> =>
  typeof ref === 'object' && ref !== null && 'instance' in ref;

const isClosable = <C>(
  ref: unknown,
): ref is ComponentRef<ClosableDialog<CloseResult<C>>> =>
  isComponentRef(ref) && 'closeDialog' in ref.instance;

/**
 * Opens `mh-dialog`s with dynamically created Angular content.
 *
 * There are two ways that dialogs get inject into the DOM.
 * 1. The global approach: by default dialogs are appended to the document body
 * 2. The scoped approach: provide this service in your component's `(view)providers` array to inject the dialog
 * into the component's own DOM structure.
 *
 * **Prefer scoped**
 * - the DOM is co-located and easier to find
 * - it ties into the parent component's lifecycle (when the parent is destroyed, so is the service and the dialogs)
 */
@Injectable({ providedIn: 'root' })
export class DialogService implements OnDestroy {
  readonly #appRef = inject(ApplicationRef);
  readonly #environmentInjector = inject(EnvironmentInjector);
  readonly #hostInjector = inject(Injector);
  readonly #hostElementRef = inject<ElementRef<Dialog>>(ElementRef, {
    optional: true,
  });
  readonly #dialogRefs = new Set<{ close: () => void }>();

  /**
   * Dynamically creates an `mh-dialog` with the given configuration and instantiates the Angular component into its
   * primary slot.
   */
  open<Component>(
    component: Type<Component>,
    config: DialogConfig<Component> = {},
  ): DialogRef<CloseResult<Component>> {
    const dialogRef = createDialog<CloseResult<Component>>(config);
    const contentRef: ComponentRef<Component> = createComponent(component, {
      hostElement: dialogRef.element,
      elementInjector: Injector.create({
        parent: config.injector ?? this.#hostInjector,
        providers: [{ provide: DialogRef, useValue: dialogRef }],
      }),
      environmentInjector: this.#environmentInjector,
    });

    this.#initContent(contentRef, config);
    const observer = this.#initContainer(dialogRef, config.container);
    this.#dialogRefs.add(dialogRef);

    if (isClosable(contentRef))
      contentRef.instance.closeDialog.subscribe(result =>
        dialogRef.close(result),
      );

    dialogRef.afterClosed$.subscribe(() => {
      if (!this.#appRef.destroyed) this.#appRef.detachView(contentRef.hostView);
      this.#dialogRefs.delete(dialogRef);
      observer?.disconnect();
      contentRef.destroy();
      dialogRef.element.remove();
    });

    // Make sure the Lit component is fully initialised before showing the dialog
    dialogRef.element.updateComplete
      .then(() => dialogRef.element.showModal())
      .catch(dialogCreationError);

    return dialogRef;
  }

  /**
   * - Make Angular aware of the component
   * - Set all input values
   * - Trigger change detection for good measure for zoneful apps
   */
  #initContent<C>(contentRef: ComponentRef<C>, config: DialogConfig<C>) {
    this.#appRef.attachView(contentRef.hostView);

    if (config.inputs)
      Object.entries(config.inputs).forEach(([key, value]) =>
        contentRef.setInput(key, value),
      );

    contentRef.changeDetectorRef.detectChanges();
  }

  /**
   * Try to inject into the component that created the dialog,
   * otherwise the nearest Angular application root
   * and if all else fails, the body element.
   */
  #getContainerEl = () =>
    this.#hostElementRef?.nativeElement ??
    (this.#appRef.components[0]?.location.nativeElement as
      | HTMLElement
      | undefined) ??
    document.body;

  /**
   * Inject the dialog into the best possible container and as a backup measure start observing the removal
   * of that container node. When the container is removed, destroy any dialogs connected to it.
   * Since afterClosed$ completes immediately, there is no risk of duplicate close handling.
   */
  #initContainer = <R>(
    dialogRef: DialogRef<R>,
    container: HTMLElement = this.#getContainerEl(),
  ) => {
    container.append(dialogRef.element);
    if (!container.parentNode) return undefined;

    const observer = new MutationObserver(mutations => {
      if (getRemovedNodes(mutations).includes(container)) dialogRef.close();
    });
    observer.observe(container.parentNode, { childList: true });
    return observer;
  };

  /** When the service is destroyed, close and destroy all opened dialogs */
  ngOnDestroy(): void {
    this.#dialogRefs.forEach(dialog => dialog.close());
  }
}
