import { shadowPrimitive } from './primitives/shadows';
import { shadowSemantic } from './semantic/shadows';

type FlatShadowEntry = { cssVar: string; value: string };

function flattenShadows(): FlatShadowEntry[] {
  const entries: FlatShadowEntry[] = [];

  entries.push(
    { cssVar: '--shadow-none', value: shadowPrimitive.none },
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
  );

  return lines.join('\n');
}
