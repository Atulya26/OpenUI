import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = {
  children?: ReactNode;
  container?: Element | DocumentFragment | null;
  disabled?: boolean;
  rootId?: string;
};

function canUseDOM() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function getPortalRoot(rootId: string) {
  const existingRoot = document.getElementById(rootId);

  if (existingRoot) {
    return { element: existingRoot, created: false };
  }

  const element = document.createElement('div');
  element.setAttribute('id', rootId);
  document.body.appendChild(element);

  return { element, created: true };
}

export function Portal({
  children,
  container,
  disabled = false,
  rootId,
}: PortalProps) {
  const [mountNode, setMountNode] = useState<Element | DocumentFragment | null>(
    null,
  );

  useEffect(() => {
    if (disabled || !canUseDOM()) {
      setMountNode(null);
      return undefined;
    }

    if (container) {
      setMountNode(container);
      return undefined;
    }

    if (!rootId) {
      setMountNode(document.body);
      return undefined;
    }

    const { element, created } = getPortalRoot(rootId);
    setMountNode(element);

    return () => {
      if (created && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [container, disabled, rootId]);

  if (disabled) {
    return <>{children}</>;
  }

  if (!mountNode) {
    return null;
  }

  return createPortal(children, mountNode);
}
