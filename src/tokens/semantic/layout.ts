/**
 * Semantic layout tokens — roles for spacing, insets, and structure.
 * References primitive `space` steps only (no arbitrary px in product code).
 *
 * iOS 26 model: safe area → layout margins → content (see docs/FIGMA-IOS26-REFERENCE.md).
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/layout
 */

import type { SpaceStep } from '../primitives/spacing';

export type LayoutSpaceRef = SpaceStep;

/**
 * Layout margins — inset inside the safe area (UIKit `layoutMarginsGuide`).
 * iPhone portrait (compact width): 16pt leading/trailing per Apple system minimum.
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/layout
 * @see https://developer.apple.com/documentation/uikit/uiviewcontroller/systemminimumlayoutmargins
 */
export const layoutMargin = {
  /** 16px — iOS compact-width system minimum (iPhone portrait) */
  horizontal: 4,
  vertical: 4,
} as const satisfies Record<string, LayoutSpaceRef>;

/** Screen & region insets (alias margin horizontal for screen edges) */
export const layoutInset = {
  /** Horizontal margin inside safe area — primary screen padding */
  screenX: layoutMargin.horizontal,
  /** Extra vertical margin inside safe area (below toolbar, etc.) */
  screenY: layoutMargin.vertical,
  /** Card / sheet inner padding */
  container: 4,
  /** Compact horizontal inset (dense toolbars) */
  screenXCompact: 3,
} as const satisfies Record<string, LayoutSpaceRef>;

/** Horizontal gaps (icon + label, chips, inline controls) */
export const layoutGapInline = {
  xs: 1,
  sm: 2,
  md: 3,
} as const satisfies Record<string, LayoutSpaceRef>;

/** Vertical gaps (form fields, list rows, related blocks) */
export const layoutGapStack = {
  xs: 2,
  sm: 3,
  md: 4,
  lg: 6,
} as const satisfies Record<string, LayoutSpaceRef>;

/** Between major sections on a screen */
export const layoutGapSection = {
  default: 7,
  loose: 8,
} as const satisfies Record<string, LayoutSpaceRef>;

/** Corner radii used by foundational components */
export const layoutRadius = {
  sm: 2,
  md: 3,
  lg: 4,
  full: 10,
} as const satisfies Record<string, LayoutSpaceRef>;

/**
 * Fixed layout constants — not on the spacing scale.
 * These are guardrails, not rhythm steps.
 */
export const layoutFixed = {
  /** Minimum touch target (Apple HIG) */
  touchTargetMin: 44,
  /** Target iPhone logical width (pt) — primary design canvas */
  screenWidth: 402,
  /** Target iPhone logical height */
  screenHeight: 874,
  /** Portrait safe area — top (Dynamic Island region) */
  safeAreaTop: 62,
  /** Portrait safe area — home indicator */
  safeAreaBottom: 34,
  safeAreaLeft: 0,
  safeAreaRight: 0,
  /** Min width for two-column layout (rare on phone; iPad web) */
  breakpointTablet: 600,
  /** Max content width — matches target screen width */
  maxContentWidth: 402,
  borderWidth: 1,
  focusRingWidth: 2,
  focusRingOffset: 2,
  columnsCompact: 1,
  columnsExpanded: 2,
} as const;

export type LayoutInsetToken = keyof typeof layoutInset;
export type LayoutGapInlineToken = keyof typeof layoutGapInline;
export type LayoutGapStackToken = keyof typeof layoutGapStack;
export type LayoutGapSectionToken = keyof typeof layoutGapSection;
export type LayoutRadiusToken = keyof typeof layoutRadius;
