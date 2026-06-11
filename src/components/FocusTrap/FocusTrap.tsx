import { useEffect, type RefObject } from 'react';

export type FocusTrapProps = {
  active?: boolean;
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  restoreFocus?: boolean;
};

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
    .filter((element) => {
      if (element.hasAttribute('disabled') || element.getAttribute('aria-hidden') === 'true') {
        return false;
      }

      const style = window.getComputedStyle(element);
      return style.visibility !== 'hidden' && style.display !== 'none';
    });
}

function focusElement(element: HTMLElement | null | undefined) {
  if (!element) {
    return;
  }

  element.focus({ preventScroll: true });
}

export function FocusTrap({
  active = true,
  containerRef,
  initialFocusRef,
  onEscapeKeyDown,
  restoreFocus = true,
}: FocusTrapProps) {
  useEffect(() => {
    if (!active || typeof document === 'undefined') {
      return undefined;
    }

    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const trapContainer = container;
    const previousActiveElement = document.activeElement as HTMLElement | null;
    const hadTabIndex = trapContainer.hasAttribute('tabindex');
    const previousTabIndex = trapContainer.getAttribute('tabindex');

    if (!hadTabIndex) {
      trapContainer.setAttribute('tabindex', '-1');
    }

    const focusTimer = window.setTimeout(() => {
      if (!trapContainer.contains(document.activeElement)) {
        const firstFocusable = getFocusableElements(trapContainer)[0];
        focusElement(initialFocusRef?.current ?? firstFocusable ?? trapContainer);
      }
    }, 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (!active || !trapContainer.contains(document.activeElement)) {
        return;
      }

      if (event.key === 'Escape') {
        onEscapeKeyDown?.(event);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements(trapContainer);

      if (focusableElements.length === 0) {
        event.preventDefault();
        focusElement(trapContainer);
        return;
      }

      const firstElement = focusableElements[0]!;
      const lastElement = focusableElements[focusableElements.length - 1]!;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        focusElement(lastElement);
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        focusElement(firstElement);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);

      if (hadTabIndex && previousTabIndex !== null) {
        trapContainer.setAttribute('tabindex', previousTabIndex);
      } else {
        trapContainer.removeAttribute('tabindex');
      }

      if (
        restoreFocus &&
        previousActiveElement &&
        document.contains(previousActiveElement)
      ) {
        focusElement(previousActiveElement);
      }
    };
  }, [active, containerRef, initialFocusRef, onEscapeKeyDown, restoreFocus]);

  return null;
}
