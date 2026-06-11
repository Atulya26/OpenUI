import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from 'react';

export type KeyboardInsetCSSProperties = CSSProperties & {
  '--openui-keyboard-inset': string;
  '--openui-keyboard-safe-area-bottom': string;
  '--openui-keyboard-offset-y': string;
};

export type KeyboardInsetOverride = number | string;

export type UseKeyboardInsetOptions = {
  /**
   * Storybook/test override. Pass a number for measured px or a tokenized CSS
   * expression such as `calc(var(--space-10) + var(--space-8))`.
   */
  simulatedInset?: KeyboardInsetOverride;
  disabled?: boolean;
};

export type KeyboardInsetState = {
  keyboardInset: number;
  keyboardInsetCssValue: string;
  isVisualViewportSupported: boolean;
  style: KeyboardInsetCSSProperties;
};

type ViewportKeyboardState = {
  keyboardInset: number;
  isVisualViewportSupported: boolean;
};

function canUseViewport(): boolean {
  return typeof window !== 'undefined';
}

function normalizeInset(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.round(value));
}

function readKeyboardInset(): ViewportKeyboardState {
  if (!canUseViewport() || !window.visualViewport) {
    return {
      keyboardInset: 0,
      isVisualViewportSupported: false,
    };
  }

  const viewport = window.visualViewport;
  const visualViewportBottom = viewport.offsetTop + viewport.height;

  return {
    keyboardInset: normalizeInset(window.innerHeight - visualViewportBottom),
    isVisualViewportSupported: true,
  };
}

function toKeyboardInsetCssValue(value: KeyboardInsetOverride | undefined, measuredInset: number): string {
  if (typeof value === 'string') {
    return value;
  }

  return `${normalizeInset(value ?? measuredInset)}px`;
}

export function useKeyboardInset({
  simulatedInset,
  disabled = false,
}: UseKeyboardInsetOptions = {}): KeyboardInsetState {
  const [viewportState, setViewportState] = useState<ViewportKeyboardState>(() => readKeyboardInset());

  useEffect(() => {
    if (disabled || simulatedInset !== undefined || !canUseViewport()) {
      return undefined;
    }

    const updateKeyboardInset = () => {
      setViewportState(readKeyboardInset());
    };

    const viewport = window.visualViewport;

    updateKeyboardInset();
    window.addEventListener('resize', updateKeyboardInset);
    viewport?.addEventListener('resize', updateKeyboardInset);
    viewport?.addEventListener('scroll', updateKeyboardInset);

    return () => {
      window.removeEventListener('resize', updateKeyboardInset);
      viewport?.removeEventListener('resize', updateKeyboardInset);
      viewport?.removeEventListener('scroll', updateKeyboardInset);
    };
  }, [disabled, simulatedInset]);

  const keyboardInset = disabled
    ? 0
    : typeof simulatedInset === 'number'
      ? normalizeInset(simulatedInset)
      : viewportState.keyboardInset;
  const keyboardInsetCssValue = disabled
    ? '0px'
    : toKeyboardInsetCssValue(simulatedInset, keyboardInset);

  return useMemo(
    () => ({
      keyboardInset,
      keyboardInsetCssValue,
      isVisualViewportSupported: viewportState.isVisualViewportSupported,
      style: {
        '--openui-keyboard-inset': keyboardInsetCssValue,
        '--openui-keyboard-safe-area-bottom':
          'calc(var(--openui-safe-area-bottom, max(var(--device-safe-area-bottom), env(safe-area-inset-bottom, 0px))) + var(--openui-keyboard-inset))',
        '--openui-keyboard-offset-y': 'calc(-1 * var(--openui-keyboard-inset))',
      },
    }),
    [keyboardInset, keyboardInsetCssValue, viewportState.isVisualViewportSupported],
  );
}
