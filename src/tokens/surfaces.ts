import { surfacePrimitive } from './primitives/surfaces';
import { surfaceSemantic } from './semantic/surfaces';

export const surfaceTokens = {
  primitive: surfacePrimitive,
  semantic: surfaceSemantic,
} as const;

export { surfacePrimitive, surfaceSemantic };
export type { SurfaceSemanticToken } from './semantic/surfaces';
