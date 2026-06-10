/**
 * Semantic layout tokens — roles for spacing, insets, and structure.
 * References primitive `space` steps only (no arbitrary px in product code).
 *
 * iOS 26 model: safe area → layout margins → content (see docs/FIGMA-IOS26-REFERENCE.md).
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/layout
 */

import type { SpaceHalfStep, SpaceStep } from '../primitives/spacing';

export type LayoutSpaceRef = SpaceStep | SpaceHalfStep;

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
  /** 2px — optical inset for nested controls, not general rhythm */
  '2xs': 'half',
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

/**
 * @deprecated Corner radii moved to `src/tokens/semantic/radius.ts` — use `--radius-*` / `--layout-radius-*` in CSS.
 */
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
  /** Max content width — matches the app content lane, not the full device shell */
  maxContentWidth: 370,
  borderWidth: 1,
  borderHairline: 1,
  borderHairlineHighDensity: 0.5,
  focusRingWidth: 2,
  focusRingOffset: 2,
  hitAreaInsetCompact: -4,
  columnsCompact: 1,
  columnsExpanded: 2,
} as const;

/**
 * Control sizing — shared height & horizontal padding scale for interactive
 * controls (Button, Input, Select, SearchBar, IconButton). One scale so every
 * control reads the same `sm | md | lg`. Values are px. Compact overrides live
 * in layout.css under `[data-density="compact"]`.
 */
export const layoutControl = {
  height: {
    /** 44px — Apple HIG touch target */
    sm: 44,
    /** 48px */
    md: 48,
    /** 56px */
    lg: 56,
    /** 60px — high-emphasis mobile action height */
    xl: 60,
  },
  /** Horizontal padding inside a control */
  padX: {
    /** 12px */
    sm: 12,
    /** 16px */
    md: 16,
    /** 20px */
    lg: 20,
    /** 24px */
    xl: 24,
  },
} as const;

export type LayoutControlSize = keyof typeof layoutControl.height;
export type LayoutInsetToken = keyof typeof layoutInset;
export type LayoutGapInlineToken = keyof typeof layoutGapInline;
export type LayoutGapStackToken = keyof typeof layoutGapStack;
export type LayoutGapSectionToken = keyof typeof layoutGapSection;
export type LayoutRadiusToken = keyof typeof layoutRadius;
