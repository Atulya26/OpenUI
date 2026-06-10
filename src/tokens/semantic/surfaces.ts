/**
 * Semantic surface material roles.
 */

export const surfaceSemantic = {
  glassBg: 'var(--surface-glass-bg)',
  glassBgStrong: 'var(--surface-glass-bg-strong)',
  glassBorder: 'var(--surface-glass-border)',
  glassBlur: 'var(--surface-glass-blur)',
} as const;

export type SurfaceSemanticToken = keyof typeof surfaceSemantic;
