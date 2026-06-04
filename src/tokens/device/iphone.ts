/**
 * Target device — iPhone Pro class (16 / 17 Pro).
 * Logical viewport: 402 × 874 pt (@3x → 1206 × 2622 px).
 *
 * Safe area + layout margins align with Apple iOS & iPadOS 26 UI Kit structure.
 * Figma source: docs/FIGMA-IOS26-REFERENCE.md (node 754:62878).
 *
 * Safe area values match iOS portrait insets for this size class
 * (Dynamic Island + home indicator). Use `env(safe-area-inset-*)` on
 * device; these constants are design-time fallbacks for Storybook & web.
 *
 * @see https://useyourloaf.com/blog/iphone-16-screen-sizes/
 * @see https://developer.apple.com/design/human-interface-guidelines/layout
 */

export const iphoneProTarget = {
  id: 'iphone-pro-402',
  label: 'iPhone 16 / 17 Pro',
  /** Logical screen width (pt / CSS px at 1×) */
  screenWidth: 402,
  /** Logical screen height */
  screenHeight: 874,
  /** @3x native pixels */
  nativeWidth: 1206,
  nativeHeight: 2622,
  scale: 3,
} as const;

/**
 * Portrait safe area insets (points) — content must stay inside.
 * Top includes status bar + Dynamic Island region (~54pt bar, 62pt inset).
 */
export const iphoneSafeArea = {
  top: 62,
  bottom: 34,
  left: 0,
  right: 0,
} as const;

/** Status bar height (Dynamic Island devices, this size class) */
export const iphoneStatusBarHeight = 54;

/**
 * Dynamic Island pill — approximate layout bounds for mockups.
 * Centered horizontally; sits within the top safe area.
 */
export const iphoneDynamicIsland = {
  /** From iOS 26 UI kit status bar spec (Figma) */
  width: 154,
  height: 37,
  top: 21,
  bottomGap: 19,
} as const;

/** Home indicator region (within bottom safe inset) */
export const iphoneHomeIndicator = {
  height: 34,
  barWidth: 134,
  barHeight: 5,
} as const;

/**
 * Layout margins inside safe area (pt).
 * Horizontal: 16pt on iPhone portrait — UIKit system minimum for compact width.
 * (Regular width / iPad often uses 20pt; not our primary canvas.)
 */
export const iphoneLayoutMargin = {
  horizontal: 16,
  vertical: 16,
} as const;

/** Content width inside safe area + horizontal margins */
export const iphoneContentWidth =
  iphoneProTarget.screenWidth -
  iphoneLayoutMargin.horizontal * 2;

/** Usable content height inside screen minus safe areas */
export const iphoneContentHeight =
  iphoneProTarget.screenHeight -
  iphoneSafeArea.top -
  iphoneSafeArea.bottom;

/** Figma reference for layout / safe-area specs */
export const iphoneFigmaReference = {
  fileKey: 'du4UrXNeeELPb3KqtdwWJQ',
  nodeId: '754:62878',
  url: 'https://www.figma.com/design/du4UrXNeeELPb3KqtdwWJQ/iOS-and-iPadOS-26--Community-?node-id=754-62878',
} as const;

/**
 * Frame asset — `public/devices/iphone-17-pro-frame.png` (450×920 RGBA).
 * Includes bezels, Dynamic Island, status bar, and home indicator.
 * Transparent screen center; content sits behind this layer in DeviceFrame.
 */
export const iphoneFrameAsset = {
  path: '/devices/iphone-17-pro-frame.png',
  width: 450,
  height: 920,
  /** Bezel inset from asset edge to screen (px) */
  screenOffsetX: 24,
  screenOffsetY: 23,
  screenWidth: 402,
  screenHeight: 874,
  /** Display corner radius at 1× — tuned to hardware PNG */
  screenCornerRadius: 58,
} as const;

export type IphoneTarget = typeof iphoneProTarget;
