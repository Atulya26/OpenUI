/**
 * Semantic type styles — iOS text styles for mobile apps.
 * Each entry references primitive size / weight / family keys.
 *
 * Dashboard-only display styles (e.g. display-72, title-64) are intentionally omitted.
 */

import type { FontSizeToken } from '../primitives/typography';

export type TypographyPrimitiveRef = {
  size: FontSizeToken;
  weight: 'regular' | 'medium' | 'semibold' | 'bold';
  family: 'inter' | 'interDisplay';
};

/** Apple HIG text styles @ default Dynamic Type size */
export const textStyles = {
  extraLargeTitle: { size: 36, weight: 'bold', family: 'interDisplay' },
  extraLargeTitle2: { size: 28, weight: 'bold', family: 'interDisplay' },
  largeTitle: { size: 34, weight: 'bold', family: 'interDisplay' },
  title1: { size: 28, weight: 'regular', family: 'interDisplay' },
  title2: { size: 22, weight: 'regular', family: 'interDisplay' },
  title3: { size: 20, weight: 'regular', family: 'interDisplay' },
  headline: { size: 17, weight: 'semibold', family: 'inter' },
  body: { size: 17, weight: 'regular', family: 'inter' },
  callout: { size: 16, weight: 'regular', family: 'inter' },
  subheadline: { size: 15, weight: 'regular', family: 'inter' },
  footnote: { size: 13, weight: 'regular', family: 'inter' },
  caption1: { size: 12, weight: 'regular', family: 'inter' },
  caption2: { size: 11, weight: 'regular', family: 'inter' },
} as const satisfies Record<string, TypographyPrimitiveRef>;

export type TextStyleName = keyof typeof textStyles;

/** Product-level aliases → HIG text style */
export const typographyRoles = {
  screenTitle: 'largeTitle',
  heroTitle: 'title1',
  sectionTitle: 'title2',
  cardTitle: 'title3',
  listTitle: 'headline',
  paragraph: 'body',
  secondary: 'subheadline',
  tertiary: 'footnote',
  label: 'footnote',
  button: 'headline',
  tabLabel: 'caption1',
  badge: 'caption2',
  input: 'body',
  placeholder: 'subheadline',
} as const satisfies Record<string, TextStyleName>;

export type TypographyRole = keyof typeof typographyRoles;
