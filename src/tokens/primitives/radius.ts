/**
 * OpenUI corner radius primitives.
 */

export const radiusPrimitive = {
  none: 0,
  '2xs': 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  '2xl': 16,
  '3xl': 20,
  '28': 28,
  full: 9999,
} as const;

export type RadiusPrimitiveToken = keyof typeof radiusPrimitive;
