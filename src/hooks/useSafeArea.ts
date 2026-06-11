import { useMemo, type CSSProperties } from 'react';

export type SafeAreaCSSProperties = CSSProperties & {
  '--openui-safe-area-top': string;
  '--openui-safe-area-bottom': string;
  '--openui-safe-area-inline-start': string;
  '--openui-safe-area-inline-end': string;
  '--openui-safe-area-block-start': string;
  '--openui-safe-area-block-end': string;
};

export type SafeAreaInsets = {
  top: string;
  bottom: string;
  inlineStart: string;
  inlineEnd: string;
  blockStart: string;
  blockEnd: string;
  style: SafeAreaCSSProperties;
};

const safeAreaTop = 'max(var(--device-safe-area-top), env(safe-area-inset-top, 0px))';
const safeAreaBottom = 'max(var(--device-safe-area-bottom), env(safe-area-inset-bottom, 0px))';
const safeAreaInlineStart = 'max(var(--device-safe-area-left), env(safe-area-inset-left, 0px))';
const safeAreaInlineEnd = 'max(var(--device-safe-area-right), env(safe-area-inset-right, 0px))';

const safeAreaInsets: SafeAreaInsets = {
  top: safeAreaTop,
  bottom: safeAreaBottom,
  inlineStart: safeAreaInlineStart,
  inlineEnd: safeAreaInlineEnd,
  blockStart: safeAreaTop,
  blockEnd: safeAreaBottom,
  style: {
    '--openui-safe-area-top': safeAreaTop,
    '--openui-safe-area-bottom': safeAreaBottom,
    '--openui-safe-area-inline-start': safeAreaInlineStart,
    '--openui-safe-area-inline-end': safeAreaInlineEnd,
    '--openui-safe-area-block-start': safeAreaTop,
    '--openui-safe-area-block-end': safeAreaBottom,
  },
};

/**
 * Returns CSS env() safe-area expressions with OpenUI device-token fallbacks.
 *
 * The values are CSS strings so callers can use them directly in custom
 * properties, inline styles, or calc() expressions without measuring layout.
 */
export function useSafeArea(): SafeAreaInsets {
  return useMemo(() => safeAreaInsets, []);
}
