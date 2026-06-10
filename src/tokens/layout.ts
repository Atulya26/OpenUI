import { space, spaceHalf, type SpaceStep } from './primitives/spacing';
import {
  iphoneContentHeight,
  iphoneContentWidth,
  iphoneDynamicIsland,
  iphoneHomeIndicator,
  iphoneLayoutMargin,
  iphoneProTarget,
  iphoneSafeArea,
  iphoneStatusBarHeight,
} from './device/iphone';
import {
  layoutControl,
  layoutFixed,
  layoutGapInline,
  layoutGapSection,
  layoutGapStack,
  layoutInset,
  type LayoutSpaceRef,
} from './semantic/layout';
import { layoutRadiusSemantic } from './semantic/radius';
import { radiusPrimitive } from './primitives/radius';

function px(step: LayoutSpaceRef): string {
  return `${step === 'half' ? spaceHalf : space[step]}px`;
}

/** Resolved semantic layout values (px strings for CSS) */
export const layoutTokens = {
  margin: {
    horizontal: px(layoutInset.screenX),
    vertical: px(layoutInset.screenY),
  },
  content: {
    width: `${iphoneContentWidth}px`,
  },
  inset: {
    screenX: px(layoutInset.screenX),
    screenY: px(layoutInset.screenY),
    container: px(layoutInset.container),
    screenXCompact: px(layoutInset.screenXCompact),
  },
  gapInline: {
    '2xs': px(layoutGapInline['2xs']),
    xs: px(layoutGapInline.xs),
    sm: px(layoutGapInline.sm),
    md: px(layoutGapInline.md),
  },
  gapStack: {
    xs: px(layoutGapStack.xs),
    sm: px(layoutGapStack.sm),
    md: px(layoutGapStack.md),
    lg: px(layoutGapStack.lg),
  },
  gapSection: {
    default: px(layoutGapSection.default),
    loose: px(layoutGapSection.loose),
  },
  radius: {
    sm: `${radiusPrimitive[layoutRadiusSemantic.sm]}px`,
    md: `${radiusPrimitive[layoutRadiusSemantic.md]}px`,
    lg: `${radiusPrimitive[layoutRadiusSemantic.lg]}px`,
    full: `${radiusPrimitive[layoutRadiusSemantic.full]}px`,
  },
  control: {
    heightSm: `${layoutControl.height.sm}px`,
    heightMd: `${layoutControl.height.md}px`,
    heightLg: `${layoutControl.height.lg}px`,
    heightXl: `${layoutControl.height.xl}px`,
    padXSm: `${layoutControl.padX.sm}px`,
    padXMd: `${layoutControl.padX.md}px`,
    padXLg: `${layoutControl.padX.lg}px`,
    padXXl: `${layoutControl.padX.xl}px`,
  },
  fixed: {
    touchTargetMin: `${layoutFixed.touchTargetMin}px`,
    screenWidth: `${layoutFixed.screenWidth}px`,
    screenHeight: `${layoutFixed.screenHeight}px`,
    safeAreaTop: `${layoutFixed.safeAreaTop}px`,
    safeAreaBottom: `${layoutFixed.safeAreaBottom}px`,
    breakpointTablet: `${layoutFixed.breakpointTablet}px`,
    maxContentWidth: `${iphoneContentWidth}px`,
    borderWidth: `${layoutFixed.borderWidth}px`,
    borderHairline: `${layoutFixed.borderHairline}px`,
    borderHairlineHighDensity: `${layoutFixed.borderHairlineHighDensity}px`,
    focusRingWidth: `${layoutFixed.focusRingWidth}px`,
    focusRingOffset: `${layoutFixed.focusRingOffset}px`,
    hitAreaInsetCompact: `${layoutFixed.hitAreaInsetCompact}px`,
    columnsCompact: layoutFixed.columnsCompact,
    columnsExpanded: layoutFixed.columnsExpanded,
  },
  device: {
    screenWidth: `${iphoneProTarget.screenWidth}px`,
    screenHeight: `${iphoneProTarget.screenHeight}px`,
    safeAreaTop: `${iphoneSafeArea.top}px`,
    safeAreaBottom: `${iphoneSafeArea.bottom}px`,
    safeAreaLeft: `${iphoneSafeArea.left}px`,
    safeAreaRight: `${iphoneSafeArea.right}px`,
    contentHeight: `${iphoneContentHeight}px`,
    contentWidth: `${iphoneContentWidth}px`,
    layoutMarginHorizontal: `${iphoneLayoutMargin.horizontal}px`,
    statusBarHeight: `${iphoneStatusBarHeight}px`,
    dynamicIslandWidth: `${iphoneDynamicIsland.width}px`,
    dynamicIslandHeight: `${iphoneDynamicIsland.height}px`,
    homeIndicatorHeight: `${iphoneHomeIndicator.height}px`,
  },
} as const;

/** Primitive space scale as CSS-ready values */
export const spaceCssVars = Object.fromEntries(
  [
    ['half', spaceHalf],
    ...Object.entries(space),
  ].map(([step, value]) => [`--space-${step}`, `${value}px`]),
) as Record<`--space-${SpaceStep}` | '--space-half', string>;

export function buildLayoutCssVariables(): string {
  const lines: string[] = [':root {'];

  lines.push(`  --space-half: ${spaceHalf}px;`);
  for (const [step, value] of Object.entries(space)) {
    lines.push(`  --space-${step}: ${value}px;`);
  }

  lines.push(
    '',
    '  /* Layout margins inside safe area (iOS 26 kit) */',
    `  --layout-margin-horizontal: ${layoutTokens.margin.horizontal};`,
    `  --layout-margin-vertical: ${layoutTokens.margin.vertical};`,
    '  --layout-content-width: var(--device-content-width);',
    '',
    `  --layout-inset-screen-x: ${layoutTokens.inset.screenX};`,
    `  --layout-inset-screen-y: ${layoutTokens.inset.screenY};`,
    `  --layout-inset-container: ${layoutTokens.inset.container};`,
    `  --layout-inset-screen-x-compact: ${layoutTokens.inset.screenXCompact};`,
    `  --layout-gap-inline-2xs: ${layoutTokens.gapInline['2xs']};`,
    `  --layout-gap-inline-xs: ${layoutTokens.gapInline.xs};`,
    `  --layout-gap-inline-sm: ${layoutTokens.gapInline.sm};`,
    `  --layout-gap-inline-md: ${layoutTokens.gapInline.md};`,
    `  --layout-gap-stack-xs: ${layoutTokens.gapStack.xs};`,
    `  --layout-gap-stack-sm: ${layoutTokens.gapStack.sm};`,
    `  --layout-gap-stack-md: ${layoutTokens.gapStack.md};`,
    `  --layout-gap-stack-lg: ${layoutTokens.gapStack.lg};`,
    `  --layout-gap-section: ${layoutTokens.gapSection.default};`,
    `  --layout-gap-section-loose: ${layoutTokens.gapSection.loose};`,
    '',
    '  /* Control sizing — shared height & horizontal padding scale */',
    `  --control-height-sm: ${layoutTokens.control.heightSm};`,
    `  --control-height-md: ${layoutTokens.control.heightMd};`,
    `  --control-height-lg: ${layoutTokens.control.heightLg};`,
    `  --control-height-xl: ${layoutTokens.control.heightXl};`,
    `  --control-pad-x-sm: ${layoutTokens.control.padXSm};`,
    `  --control-pad-x-md: ${layoutTokens.control.padXMd};`,
    `  --control-pad-x-lg: ${layoutTokens.control.padXLg};`,
    `  --control-pad-x-xl: ${layoutTokens.control.padXXl};`,
    '',
    `  --layout-border-width: ${layoutTokens.fixed.borderWidth};`,
    `  --layout-border-hairline: ${layoutTokens.fixed.borderHairline};`,
    `  --layout-touch-target-min: ${layoutTokens.fixed.touchTargetMin};`,
    `  --layout-focus-ring-width: ${layoutTokens.fixed.focusRingWidth};`,
    `  --layout-focus-ring-offset: ${layoutTokens.fixed.focusRingOffset};`,
    `  --layout-hit-area-inset-compact: ${layoutTokens.fixed.hitAreaInsetCompact};`,
    `  --layout-breakpoint-tablet: ${layoutTokens.fixed.breakpointTablet};`,
    `  --layout-max-content-width: ${layoutTokens.fixed.maxContentWidth};`,
    `  --layout-columns-compact: ${layoutTokens.fixed.columnsCompact};`,
    `  --layout-columns-expanded: ${layoutTokens.fixed.columnsExpanded};`,
    '',
    '  /* iPhone Pro target (402×874) — design canvas & safe areas */',
    `  --device-screen-width: ${layoutTokens.device.screenWidth};`,
    `  --device-screen-height: ${layoutTokens.device.screenHeight};`,
    `  --device-safe-area-top: ${layoutTokens.device.safeAreaTop};`,
    `  --device-safe-area-bottom: ${layoutTokens.device.safeAreaBottom};`,
    `  --device-safe-area-left: ${layoutTokens.device.safeAreaLeft};`,
    `  --device-safe-area-right: ${layoutTokens.device.safeAreaRight};`,
    `  --device-content-height: ${layoutTokens.device.contentHeight};`,
    `  --device-content-width: ${layoutTokens.device.contentWidth};`,
    `  --device-layout-margin-horizontal: ${layoutTokens.device.layoutMarginHorizontal};`,
    `  --device-status-bar-height: ${layoutTokens.device.statusBarHeight};`,
    `  --device-dynamic-island-width: ${layoutTokens.device.dynamicIslandWidth};`,
    `  --device-dynamic-island-height: ${layoutTokens.device.dynamicIslandHeight};`,
    `  --device-home-indicator-height: ${layoutTokens.device.homeIndicatorHeight};`,
    '}',
    '',
    '@media (min-resolution: 2dppx) {',
    '  :root {',
    `    --layout-border-hairline: ${layoutTokens.fixed.borderHairlineHighDensity};`,
    '  }',
    '}',
  );

  return lines.join('\n');
}
