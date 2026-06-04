/**
 * Typography primitives — Inter & Inter Display only.
 *
 * Size ramp is tuned for mobile (iOS Dynamic Type default), not Align UI dashboard
 * display sizes (48px+). Align type scale (Figma node 2697:307) informed
 * weight / tracking / line-height relationships.
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/typography
 */

export const fontFamily = {
  /** Body & UI text — use at 19px and below (mirrors SF Text) */
  inter: '"Inter", system-ui, -apple-system, sans-serif',
  /** Headings & large type — use at 20px and above (mirrors SF Display) */
  interDisplay: '"Inter Display", "Inter", system-ui, -apple-system, sans-serif',
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/** Mobile size ramp (px). Omits dashboard-only steps (40, 48, 56, 64, 72, 80). */
export const fontSize = {
  11: 11,
  12: 12,
  13: 13,
  15: 15,
  16: 16,
  17: 17,
  20: 20,
  22: 22,
  28: 28,
  34: 34,
  36: 36,
} as const;

export type FontSizeToken = keyof typeof fontSize;

/**
 * Line height in px — matched to Apple HIG default Dynamic Type leading.
 * @see https://www.iosfontsizes.com/
 */
export const lineHeight = {
  11: 13,
  12: 16,
  13: 18,
  15: 20,
  16: 21,
  17: 22,
  20: 25,
  22: 28,
  28: 34,
  34: 41,
  36: 43,
} as const satisfies Record<FontSizeToken, number>;

/**
 * Letter-spacing (tracking) in em — negative on large sizes, neutral on small.
 * Values follow Apple HIG tracking curves, adapted for Inter.
 */
export const letterSpacing = {
  11: '0.006em',
  12: '0',
  13: '-0.006em',
  15: '-0.011em',
  16: '-0.013em',
  17: '-0.014em',
  20: '-0.017em',
  22: '-0.02em',
  28: '-0.022em',
  34: '-0.024em',
  36: '-0.024em',
} as const satisfies Record<FontSizeToken, string>;

export const typographyPrimitives = {
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
} as const;
