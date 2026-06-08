/**
 * OpenUI z-index primitives.
 * Gapped numeric scale — room between bands for local stacking (e.g. card +1).
 * Inspired by Apple HIG presentation layers and Material 3 overlay ordering.
 */

export const zIndexPrimitive = {
  base: 0,
  raised: 1,
  sticky: 10,
  fab: 20,
  dropdown: 100,
  popover: 150,
  backdrop: 200,
  sheet: 250,
  modal: 300,
  toast: 500,
  max: 999,
} as const;

export type ZIndexPrimitiveToken = keyof typeof zIndexPrimitive;
