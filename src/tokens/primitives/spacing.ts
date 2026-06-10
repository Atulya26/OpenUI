/**
 * Spacing primitives — 4px base grid.
 * Harmonized with Material 4dp grid; used for mobile layout rhythm.
 *
 * @see https://m3.material.io/foundations/layout/layout-overview/overview
 */

/** Base grid unit (px). All steps are multiples of this value. */
export const spaceUnit = 4 as const;

/** Half-step used for optical insets and concentric nested controls. */
export const spaceHalf = 2 as const;

/**
 * Primitive spacing scale. Keys are step numbers; values are px.
 * Do not use these directly in UI — use semantic `layout` tokens.
 */
export const space = {
  0: 0,
  1: spaceUnit * 1, // 4
  2: spaceUnit * 2, // 8
  3: spaceUnit * 3, // 12
  4: spaceUnit * 4, // 16
  5: spaceUnit * 5, // 20
  6: spaceUnit * 6, // 24
  7: spaceUnit * 8, // 32
  8: spaceUnit * 10, // 40
  9: spaceUnit * 12, // 48
  10: spaceUnit * 16, // 64
} as const;

export type SpaceStep = keyof typeof space;
export type SpaceHalfStep = 'half';

export const spacingPrimitives = {
  unit: spaceUnit,
  half: spaceHalf,
  scale: space,
} as const;
