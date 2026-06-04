import type { CSSProperties } from 'react';
import type { TextStyleName } from '@/tokens';

function toKebab(name: string): string {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/** Apply a resolved text style via CSS custom properties (Inter / Inter Display only). */
export function textStyle(name: TextStyleName): CSSProperties {
  const k = toKebab(name);
  return {
    fontFamily: `var(--text-${k}-font-family)`,
    fontSize: `var(--text-${k}-font-size)`,
    lineHeight: `var(--text-${k}-line-height)`,
    fontWeight: `var(--text-${k}-font-weight)`,
    letterSpacing: `var(--text-${k}-letter-spacing)`,
  };
}

/** Emphasis on top of a text style (e.g. footnote + semibold for labels). */
export function textStyleEmphasis(
  name: TextStyleName,
  extra?: CSSProperties,
): CSSProperties {
  return { ...textStyle(name), ...extra };
}
