/**
 * OpenUI motion primitives.
 */

export const motionDurationPrimitive = {
  instant: 0,
  micro: 90,
  fast: 140,
  base: 220,
  slow: 320,
  slower: 420,
  celebration: 520,
  loop: 900,
} as const;

export type MotionDurationPrimitiveToken = keyof typeof motionDurationPrimitive;

export const motionEasingPrimitive = {
  linear: 'linear',
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  standardDecelerate: 'cubic-bezier(0, 0, 0, 1)',
  standardAccelerate: 'cubic-bezier(0.3, 0, 1, 1)',
  emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
  smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
  springSoft: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export type MotionEasingPrimitiveToken = keyof typeof motionEasingPrimitive;

export const motionTransformPrimitive = {
  distanceNone: '0px',
  distanceNudge: '2px',
  distanceEnterY: '8px',
  distanceSheetY: '16px',
  scaleRest: 1,
  scalePress: 0.985,
  scaleEnter: 0.98,
  scaleEmphasized: 1.015,
} as const;

export type MotionTransformPrimitiveToken = keyof typeof motionTransformPrimitive;

export const motionPrimitive = {
  duration: motionDurationPrimitive,
  easing: motionEasingPrimitive,
  transform: motionTransformPrimitive,
} as const;
