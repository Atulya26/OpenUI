/**
 * Icon tokens — sizes & semantic colors aligned with Lucide defaults.
 * @see https://lucide.dev/guide/react/
 */

/** Mobile-friendly icon sizes (px). Default matches Lucide (24). */
export const iconSize = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export type IconSizeToken = keyof typeof iconSize;

/** Lucide default stroke width — keep consistent across the DS */
export const iconStrokeWidth = {
  regular: 2,
  thin: 1.5,
  bold: 2.5,
} as const;

export type IconStrokeToken = keyof typeof iconStrokeWidth;

/** Maps to resolved --color-icon-* / --color-primary-base CSS variables */
export const iconColor = {
  strong: 'var(--color-icon-strong950)',
  sub: 'var(--color-icon-sub600)',
  soft: 'var(--color-icon-soft400)',
  disabled: 'var(--color-icon-disabled300)',
  white: 'var(--color-icon-white0)',
  primary: 'var(--color-primary-base)',
  inherit: 'currentColor',
} as const;

export type IconColorToken = keyof typeof iconColor;
