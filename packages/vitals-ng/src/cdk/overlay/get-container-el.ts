import { ApplicationRef, DOCUMENT, ElementRef, inject } from '@angular/core';

/**
 * Try to get the component that created the service,
 * otherwise the nearest Angular application root
 * and if all else fails, the body element.
 */
export const getContainerEl = (
  appRef = inject(ApplicationRef),
  document = inject(DOCUMENT),
  hostElementRef = inject<ElementRef<HTMLElement>>(ElementRef, {
    optional: true,
  }),
) =>
  hostElementRef?.nativeElement ??
  (appRef.components[0]?.location.nativeElement as HTMLElement | undefined) ??
  document.body;
