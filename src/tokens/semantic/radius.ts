/**
 * Semantic corner radius — product roles → Align UI primitive steps.
 */

import type { RadiusPrimitiveToken } from '../primitives/radius';

export type RadiusSemanticRef = RadiusPrimitiveToken;

/** Default radii for controls and surfaces (mobile product UI) */
export const radiusSemantic = {
  control: 'lg',
  surface: 'xl',
  surfaceLg: '2xl',
  pill: 'full',
} as const satisfies Record<string, RadiusSemanticRef>;

/**
 * Legacy layout radius names → primitive refs (backward compatible with --layout-radius-*).
 * @deprecated Prefer --radius-* primitives or --radius-control / --radius-surface in new code.
 */
export const layoutRadiusSemantic = {
  sm: 'md',
  md: 'xl',
  lg: '2xl',
  full: 'full',
} as const satisfies Record<string, RadiusSemanticRef>;

export type RadiusSemanticToken = keyof typeof radiusSemantic;
export type LayoutRadiusSemanticToken = keyof typeof layoutRadiusSemantic;
