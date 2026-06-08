/**
 * Semantic elevation and stacking roles.
 * Z-index roles follow mobile overlay order (HIG sheets/alerts + M3 overlay stack).
 * Shadow refs point at existing --shadow-* semantic aliases in shadows.css.
 */

import type { ZIndexPrimitiveToken } from '../primitives/zIndex';
import type { ShadowSemanticToken } from './shadows';

export const zIndexSemantic = {
  base: 'base',
  raised: 'raised',
  sticky: 'sticky',
  fab: 'fab',
  dropdown: 'dropdown',
  backdrop: 'backdrop',
  sheet: 'sheet',
  modal: 'modal',
  popover: 'popover',
  toast: 'toast',
} as const satisfies Record<string, ZIndexPrimitiveToken>;

export type ZIndexSemanticToken = keyof typeof zIndexSemantic;

export type ElevationRole = {
  level: 0 | 1 | 2 | 3 | 4 | 5;
  shadow: ShadowSemanticToken;
  zIndex: ZIndexSemanticToken;
};

export const elevationSemantic = {
  /** Level 0 — flush with screen; lists, plain backgrounds */
  flat: { level: 0, shadow: 'none', zIndex: 'base' },
  /** Level 1 — resting chips, subtle cards (M3 level 1) */
  resting: { level: 1, shadow: 'elevationSubtle', zIndex: 'raised' },
  /** Level 2 — default cards, grouped surfaces (M3 level 2) */
  card: { level: 2, shadow: 'surfaceCard', zIndex: 'raised' },
  /** Level 3 — FAB, sticky bars, menus (M3 level 3) */
  floating: { level: 3, shadow: 'elevationRaised', zIndex: 'fab' },
  /** Level 4 — sheets, drawers, raised panels (M3 level 4) */
  overlay: { level: 4, shadow: 'surfaceCustomMd', zIndex: 'sheet' },
  /** Level 5 — modals, peak overlays; use sparingly on mobile (M3 level 5) */
  modal: { level: 5, shadow: 'surfaceCustomLg', zIndex: 'modal' },
} as const satisfies Record<string, ElevationRole>;

export type ElevationSemanticToken = keyof typeof elevationSemantic;

/** Overlay-specific z-index roles (no shadow — scrims are color, not elevation) */
export const overlayZIndexSemantic = {
  backdrop: 'backdrop',
  sheet: 'sheet',
  modal: 'modal',
  popover: 'popover',
  toast: 'toast',
  dropdown: 'dropdown',
} as const satisfies Record<string, ZIndexPrimitiveToken>;

export type OverlayZIndexSemanticToken = keyof typeof overlayZIndexSemantic;
