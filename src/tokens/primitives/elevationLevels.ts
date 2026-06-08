/**
 * Material 3–aligned elevation levels (0–5).
 * Levels describe perceived depth; pair with shadow tokens in semantic elevation roles.
 */

export const elevationLevelPrimitive = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
} as const;

export type ElevationLevelPrimitiveToken = keyof typeof elevationLevelPrimitive;
