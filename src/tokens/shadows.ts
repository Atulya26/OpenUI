import { shadowPrimitive } from './primitives/shadows';
import { shadowSemantic } from './semantic/shadows';

type FlatShadowEntry = { cssVar: string; value: string };

function flattenShadows(): FlatShadowEntry[] {
  const entries: FlatShadowEntry[] = [];

  entries.push(
    { cssVar: '--shadow-none', value: shadowPrimitive.none },
    { cssVar: '--shadow-ring-canvas', value: shadowPrimitive.ring.canvas },
    { cssVar: '--shadow-ring-stroke', value: shadowPrimitive.ring.stroke },
    { cssVar: '--shadow-ring-neutral-ink', value: shadowPrimitive.ring.neutralInk },
    { cssVar: '--shadow-ring-focus-primary', value: shadowPrimitive.ring.focusPrimary },
    { cssVar: '--shadow-ring-focus-neutral', value: shadowPrimitive.ring.focusNeutral },
    { cssVar: '--shadow-ring-focus-error', value: shadowPrimitive.ring.focusError },
    { cssVar: '--shadow-regular-x-small', value: shadowPrimitive.regular.xSmall },
    { cssVar: '--shadow-regular-medium', value: shadowPrimitive.regular.medium },
    { cssVar: '--shadow-card-large', value: shadowPrimitive.card.large },
    { cssVar: '--shadow-custom-x-small', value: shadowPrimitive.custom.xSmall },
    { cssVar: '--shadow-custom-small', value: shadowPrimitive.custom.small },
    { cssVar: '--shadow-custom-medium', value: shadowPrimitive.custom.medium },
    { cssVar: '--shadow-custom-large', value: shadowPrimitive.custom.large },
    { cssVar: '--shadow-colored-gray', value: shadowPrimitive.colored.gray },
    { cssVar: '--shadow-colored-blue', value: shadowPrimitive.colored.blue },
    { cssVar: '--shadow-colored-purple', value: shadowPrimitive.colored.purple },
    { cssVar: '--shadow-colored-orange', value: shadowPrimitive.colored.orange },
    { cssVar: '--shadow-colored-green', value: shadowPrimitive.colored.green },
    { cssVar: '--shadow-colored-primary', value: shadowPrimitive.colored.primary },
    { cssVar: '--shadow-component-tooltip', value: shadowPrimitive.component.tooltip },
    {
      cssVar: '--shadow-component-button-primary-focus',
      value: shadowPrimitive.component.buttonPrimaryFocus,
    },
    {
      cssVar: '--shadow-component-button-important-focus',
      value: shadowPrimitive.component.buttonImportantFocus,
    },
    {
      cssVar: '--shadow-component-button-error-focus',
      value: shadowPrimitive.component.buttonErrorFocus,
    },
    {
      cssVar: '--shadow-component-fancy-button-neutral',
      value: shadowPrimitive.component.fancyButtonNeutral,
    },
    {
      cssVar: '--shadow-component-fancy-button-primary',
      value: shadowPrimitive.component.fancyButtonPrimary,
    },
    {
      cssVar: '--shadow-component-fancy-button-error',
      value: shadowPrimitive.component.fancyButtonError,
    },
    {
      cssVar: '--shadow-component-fancy-button-stroke',
      value: shadowPrimitive.component.fancyButtonStroke,
    },
    {
      cssVar: '--shadow-component-toggle-switch',
      value: shadowPrimitive.component.toggleSwitch,
    },
    {
      cssVar: '--shadow-component-custom-button',
      value: shadowPrimitive.component.customButton,
    },
    {
      cssVar: '--shadow-component-custom-button-hover',
      value: shadowPrimitive.component.customButtonHover,
    },
    {
      cssVar: '--shadow-component-custom-input-default',
      value: shadowPrimitive.component.customInputDefault,
    },
    {
      cssVar: '--shadow-component-custom-input-hover',
      value: shadowPrimitive.component.customInputHover,
    },
    {
      cssVar: '--shadow-component-custom-input-active',
      value: shadowPrimitive.component.customInputActive,
    },
  );

  return entries;
}

export const shadowCssEntries = flattenShadows();

const darkShadowCssLines = [
  ":root[data-theme='dark'] {",
  '  --shadow-ring-canvas: var(--color-bg-white0);',
  '  --shadow-ring-stroke: color-mix(in srgb, var(--color-static-white) 10%, transparent);',
  '  --shadow-ring-neutral-ink: color-mix(in srgb, var(--color-static-white) 18%, transparent);',
  '  --shadow-ring-focus-neutral: color-mix(in srgb, var(--color-static-white) 16%, transparent);',
  '',
  '  --shadow-regular-x-small: 0px 1px 2px 0px rgba(0, 0, 0, 0.44);',
  '  --shadow-regular-medium: 0px 18px 36px -14px rgba(0, 0, 0, 0.72);',
  '',
  '  --shadow-card-large:',
  '    inset 0px 1px 0px 0px color-mix(in srgb, var(--color-static-white) 6%, transparent),',
  '    0px 0px 0px 1px var(--shadow-ring-stroke),',
  '    0px 10px 28px -18px rgba(0, 0, 0, 0.72);',
  '',
  '  --shadow-custom-x-small:',
  '    inset 0px 1px 0px 0px color-mix(in srgb, var(--color-static-white) 5%, transparent),',
  '    0px 0px 0px 1px var(--shadow-ring-stroke),',
  '    0px 6px 14px -10px rgba(0, 0, 0, 0.72);',
  '  --shadow-custom-small:',
  '    0px 0px 0px 1px var(--shadow-ring-stroke),',
  '    0px 12px 22px -16px rgba(0, 0, 0, 0.78),',
  '    inset 0px 1px 0px 0px color-mix(in srgb, var(--color-static-white) 5%, transparent);',
  '  --shadow-custom-medium:',
  '    inset 0px 1px 0px 0px color-mix(in srgb, var(--color-static-white) 5%, transparent),',
  '    0px 0px 0px 1px var(--shadow-ring-stroke),',
  '    0px 20px 38px -24px rgba(0, 0, 0, 0.82);',
  '  --shadow-custom-large:',
  '    0px 0px 0px 1px var(--shadow-ring-stroke),',
  '    0px 28px 54px -30px rgba(0, 0, 0, 0.86),',
  '    inset 0px 1px 0px 0px color-mix(in srgb, var(--color-static-white) 5%, transparent);',
  '',
  '  --shadow-component-fancy-button-neutral:',
  '    0px 0px 0px 1px var(--shadow-ring-neutral-ink), 0px 2px 5px 0px rgba(0, 0, 0, 0.48);',
  '  --shadow-component-fancy-button-primary:',
  '    0px 0px 0px 1px var(--color-primary-base), 0px 2px 6px 0px rgba(0, 0, 0, 0.46);',
  '  --shadow-component-fancy-button-error:',
  '    0px 0px 0px 1px var(--color-state-error-base), 0px 2px 6px 0px rgba(0, 0, 0, 0.46);',
  '  --shadow-component-fancy-button-stroke:',
  '    0px 0px 0px 1px var(--shadow-ring-stroke), 0px 4px 10px -8px rgba(0, 0, 0, 0.72);',
  '  --shadow-component-toggle-switch:',
  '    0px 2px 5px 0px rgba(0, 0, 0, 0.4), 0px 6px 12px -8px rgba(0, 0, 0, 0.68);',
  '  --shadow-component-custom-input-default:',
  '    0px 0px 0px 1px var(--shadow-ring-stroke),',
  '    0px 6px 14px -12px rgba(0, 0, 0, 0.7);',
  '  --shadow-component-custom-input-hover:',
  '    0px 0px 0px 1px color-mix(in srgb, var(--color-static-white) 16%, transparent);',
  '  --shadow-component-custom-input-active:',
  '    0px 0px 0px 1.4px var(--color-primary-base),',
  '    0px 8px 18px -14px rgba(0, 0, 0, 0.74);',
  '}',
] as const;

export const shadowTokens = {
  semantic: shadowSemantic,
  primitive: shadowPrimitive,
} as const;

export function buildShadowCssVariables(): string {
  const lines: string[] = [':root {', '  /* OpenUI shadow primitives */'];

  for (const { cssVar, value } of shadowCssEntries) {
    lines.push(`  ${cssVar}: ${value};`);
  }

  lines.push(
    '',
    '  /* Semantic shadow roles */',
    '  --shadow-elevation-none: var(--shadow-none);',
    '  --shadow-elevation-subtle: var(--shadow-regular-x-small);',
    '  --shadow-elevation-raised: var(--shadow-regular-medium);',
    '  --shadow-surface-card: var(--shadow-card-large);',
    '  --shadow-surface-custom-xs: var(--shadow-custom-x-small);',
    '  --shadow-surface-custom-sm: var(--shadow-custom-small);',
    '  --shadow-surface-custom-md: var(--shadow-custom-medium);',
    '  --shadow-surface-custom-lg: var(--shadow-custom-large);',
    '}',
    '',
    ...darkShadowCssLines,
  );

  return lines.join('\n');
}
