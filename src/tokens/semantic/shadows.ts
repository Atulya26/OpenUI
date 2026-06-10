/**
 * Semantic shadow roles — map product intent to primitive stacks.
 * Component-specific stacks live under shadowPrimitive.component for future wiring.
 */

import { shadowPrimitive } from '../primitives/shadows';

export const shadowSemantic = {
  none: shadowPrimitive.none,
  ringCanvas: shadowPrimitive.ring.canvas,
  ringStroke: shadowPrimitive.ring.stroke,
  ringNeutralInk: shadowPrimitive.ring.neutralInk,
  elevationSubtle: shadowPrimitive.regular.xSmall,
  elevationRaised: shadowPrimitive.regular.medium,
  surfaceCard: shadowPrimitive.card.large,
  surfaceCustomXs: shadowPrimitive.custom.xSmall,
  surfaceCustomSm: shadowPrimitive.custom.small,
  surfaceCustomMd: shadowPrimitive.custom.medium,
  surfaceCustomLg: shadowPrimitive.custom.large,
} as const;

export type ShadowSemanticToken = keyof typeof shadowSemantic;
