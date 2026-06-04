/**
 * Semantic motion roles — product intent to OpenUI primitive motion.
 */

import type {
  MotionDurationPrimitiveToken,
  MotionEasingPrimitiveToken,
} from '../primitives/motion';

export const motionDurationSemantic = {
  feedback: 'micro',
  state: 'fast',
  enter: 'base',
  exit: 'fast',
  layout: 'slow',
  expressive: 'slower',
  celebrate: 'celebration',
  loading: 'loop',
} as const satisfies Record<string, MotionDurationPrimitiveToken>;

export type MotionDurationSemanticToken = keyof typeof motionDurationSemantic;

export const motionEasingSemantic = {
  feedback: 'standard',
  state: 'standard',
  enter: 'emphasizedDecelerate',
  exit: 'emphasizedAccelerate',
  layout: 'smooth',
  expressive: 'springSoft',
} as const satisfies Record<string, MotionEasingPrimitiveToken>;

export type MotionEasingSemanticToken = keyof typeof motionEasingSemantic;

export const motionTransitionSemantic = {
  feedback: ['background-color', 'border-color', 'box-shadow', 'color', 'opacity', 'transform'],
  surface: ['background-color', 'border-color', 'box-shadow', 'transform'],
  content: ['opacity', 'transform'],
  layout: ['grid-template-rows', 'max-height', 'opacity', 'transform'],
} as const;

export type MotionTransitionSemanticToken = keyof typeof motionTransitionSemantic;
