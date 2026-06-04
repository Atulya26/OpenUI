import { radiusPrimitive, type RadiusPrimitiveToken } from './primitives/radius';
import {
  layoutRadiusSemantic,
  radiusSemantic,
  type LayoutRadiusSemanticToken,
} from './semantic/radius';

function px(value: number): string {
  return value === 9999 ? '9999px' : `${value}px`;
}

export const radiusTokens = {
  primitive: Object.fromEntries(
    Object.entries(radiusPrimitive).map(([key, value]) => [
      key,
      px(value),
    ]),
  ) as Record<RadiusPrimitiveToken, string>,
  semantic: {
    control: `var(--radius-${radiusSemantic.control})`,
    surface: `var(--radius-${radiusSemantic.surface})`,
    surfaceLg: `var(--radius-${radiusSemantic.surfaceLg})`,
    pill: `var(--radius-${radiusSemantic.pill})`,
  },
  layout: Object.fromEntries(
    Object.entries(layoutRadiusSemantic).map(([key, ref]) => [
      key,
      `var(--radius-${ref})`,
    ]),
  ) as Record<LayoutRadiusSemanticToken, string>,
} as const;

export function buildRadiusCssVariables(): string {
  const lines: string[] = [':root {', '  /* Corner radius primitives (Align UI 2.0) */'];

  for (const [key, value] of Object.entries(radiusPrimitive)) {
    lines.push(`  --radius-${key}: ${px(value)};`);
  }

  lines.push(
    '',
    '  /* Semantic radius roles */',
    `  --radius-control: ${radiusTokens.semantic.control};`,
    `  --radius-surface: ${radiusTokens.semantic.surface};`,
    `  --radius-surface-lg: ${radiusTokens.semantic.surfaceLg};`,
    `  --radius-pill: ${radiusTokens.semantic.pill};`,
    '',
    '  /* Legacy layout aliases (components may still use --layout-radius-*) */',
    `  --layout-radius-sm: ${radiusTokens.layout.sm};`,
    `  --layout-radius-md: ${radiusTokens.layout.md};`,
    `  --layout-radius-lg: ${radiusTokens.layout.lg};`,
    `  --layout-radius-full: ${radiusTokens.layout.full};`,
    '}',
  );

  return lines.join('\n');
}
