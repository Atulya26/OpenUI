import { elevationLevelPrimitive } from './primitives/elevationLevels';
import { zIndexPrimitive } from './primitives/zIndex';
import {
  elevationSemantic,
  overlayZIndexSemantic,
  zIndexSemantic,
  type ElevationSemanticToken,
  type OverlayZIndexSemanticToken,
  type ZIndexSemanticToken,
} from './semantic/elevation';
import { shadowSemantic } from './semantic/shadows';

function kebab(value: string): string {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

const shadowCssVarBySemantic: Record<keyof typeof shadowSemantic, string> = {
  none: '--shadow-elevation-none',
  ringCanvas: '--shadow-ring-canvas',
  ringStroke: '--shadow-ring-stroke',
  ringNeutralInk: '--shadow-ring-neutral-ink',
  elevationSubtle: '--shadow-elevation-subtle',
  elevationRaised: '--shadow-elevation-raised',
  surfaceCard: '--shadow-surface-card',
  surfaceCardMobile: '--shadow-surface-card-mobile',
  surfaceCustomXs: '--shadow-surface-custom-xs',
  surfaceCustomSm: '--shadow-surface-custom-sm',
  surfaceCustomMd: '--shadow-surface-custom-md',
  surfaceCustomLg: '--shadow-surface-custom-lg',
};

export const elevationTokens = {
  primitive: {
    zIndex: zIndexPrimitive,
    level: elevationLevelPrimitive,
  },
  semantic: {
    zIndex: zIndexSemantic,
    overlayZIndex: overlayZIndexSemantic,
    elevation: elevationSemantic,
  },
} as const;

export function buildElevationCssVariables(): string {
  const lines: string[] = [':root {', '  /* OpenUI z-index primitives */'];

  for (const [key, value] of Object.entries(zIndexPrimitive)) {
    lines.push(`  --z-index-${kebab(key)}: ${value};`);
  }

  lines.push('', '  /* Semantic z-index roles (product UI) */');
  for (const [key, ref] of Object.entries(zIndexSemantic)) {
    lines.push(`  --z-${key}: var(--z-index-${ref});`);
  }

  lines.push('', '  /* Overlay z-index roles */');
  for (const [key, ref] of Object.entries(overlayZIndexSemantic)) {
    lines.push(`  --z-overlay-${key}: var(--z-index-${ref});`);
  }

  lines.push('', '  /* Elevation levels (Material 3 scale 0–5) */');
  for (const [key, value] of Object.entries(elevationLevelPrimitive)) {
    lines.push(`  --elevation-level-${key}: ${value};`);
  }

  lines.push('', '  /* Semantic elevation roles — shadow + z-index bundles */');
  for (const [key, role] of Object.entries(elevationSemantic)) {
    const shadowVar = shadowCssVarBySemantic[role.shadow];
    lines.push(`  --elevation-${key}-level: var(--elevation-level-${role.level});`);
    lines.push(`  --elevation-${key}-shadow: var(${shadowVar});`);
    lines.push(`  --elevation-${key}-z: var(--z-${role.zIndex});`);
  }

  lines.push('}');
  return lines.join('\n');
}

export {
  elevationLevelPrimitive,
  elevationSemantic,
  overlayZIndexSemantic,
  zIndexPrimitive,
  zIndexSemantic,
  type ElevationSemanticToken,
  type OverlayZIndexSemanticToken,
  type ZIndexSemanticToken,
};
