import {
  motionDurationPrimitive,
  motionEasingPrimitive,
  motionPrimitive,
  motionTransformPrimitive,
  type MotionDurationPrimitiveToken,
  type MotionEasingPrimitiveToken,
  type MotionTransformPrimitiveToken,
} from './primitives/motion';
import {
  motionDurationSemantic,
  motionEasingSemantic,
  motionTransitionSemantic,
  type MotionDurationSemanticToken,
  type MotionEasingSemanticToken,
  type MotionTransitionSemanticToken,
} from './semantic/motion';

function ms(value: number): string {
  return `${value}ms`;
}

function kebab(value: string): string {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

function transitionValue(properties: readonly string[], duration: string, easing: string): string {
  return properties
    .map((property) => `${property} ${duration} ${easing}`)
    .join(', ');
}

export const motionTokens = {
  primitive: {
    duration: Object.fromEntries(
      Object.entries(motionDurationPrimitive).map(([key, value]) => [
        key,
        ms(value),
      ]),
    ) as Record<MotionDurationPrimitiveToken, string>,
    easing: motionEasingPrimitive,
    transform: motionTransformPrimitive,
  },
  semantic: {
    duration: Object.fromEntries(
      Object.entries(motionDurationSemantic).map(([key, ref]) => [
        key,
        `var(--motion-duration-${ref})`,
      ]),
    ) as Record<MotionDurationSemanticToken, string>,
    easing: Object.fromEntries(
      Object.entries(motionEasingSemantic).map(([key, ref]) => [
        key,
        `var(--motion-ease-${kebab(ref)})`,
      ]),
    ) as Record<MotionEasingSemanticToken, string>,
  },
} as const;

export function buildMotionCssVariables(): string {
  const lines: string[] = [':root {', '  /* OpenUI motion duration primitives */'];

  for (const [key, value] of Object.entries(motionDurationPrimitive)) {
    lines.push(`  --motion-duration-${key}: ${ms(value)};`);
  }

  lines.push('', '  /* OpenUI motion easing primitives */');
  for (const [key, value] of Object.entries(motionEasingPrimitive)) {
    lines.push(`  --motion-ease-${kebab(key)}: ${value};`);
  }

  lines.push('', '  /* OpenUI motion transform primitives */');
  for (const [key, value] of Object.entries(motionTransformPrimitive)) {
    const cssValue = typeof value === 'number' ? String(value) : value;
    lines.push(`  --motion-${kebab(key)}: ${cssValue};`);
  }

  lines.push('', '  /* Semantic motion duration roles */');
  for (const [key, ref] of Object.entries(motionDurationSemantic)) {
    lines.push(`  --motion-duration-${key}: var(--motion-duration-${ref});`);
  }

  lines.push('', '  /* Semantic motion easing roles */');
  for (const [key, ref] of Object.entries(motionEasingSemantic)) {
    lines.push(`  --motion-ease-${key}: var(--motion-ease-${kebab(ref)});`);
  }

  lines.push('', '  /* Semantic transition contracts */');
  lines.push(
    `  --motion-transition-feedback: ${transitionValue(
      motionTransitionSemantic.feedback,
      'var(--motion-duration-feedback)',
      'var(--motion-ease-feedback)',
    )};`,
    `  --motion-transition-surface: ${transitionValue(
      motionTransitionSemantic.surface,
      'var(--motion-duration-state)',
      'var(--motion-ease-state)',
    )};`,
    `  --motion-transition-content: ${transitionValue(
      motionTransitionSemantic.content,
      'var(--motion-duration-enter)',
      'var(--motion-ease-enter)',
    )};`,
    `  --motion-transition-layout: ${transitionValue(
      motionTransitionSemantic.layout,
      'var(--motion-duration-layout)',
      'var(--motion-ease-layout)',
    )};`,
    '}',
  );

  lines.push(
    '',
    '@media (prefers-reduced-motion: reduce) {',
    '  :root {',
    '    --motion-duration-micro: 0ms;',
    '    --motion-duration-fast: 0ms;',
    '    --motion-duration-base: 0ms;',
    '    --motion-duration-slow: 0ms;',
    '    --motion-duration-slower: 0ms;',
    '    --motion-duration-celebration: 0ms;',
    '    --motion-duration-loop: 0ms;',
    '    --motion-distance-nudge: 0px;',
    '    --motion-distance-enter-y: 0px;',
    '    --motion-distance-sheet-y: 0px;',
    '    --motion-scale-press: 1;',
    '    --motion-scale-enter: 1;',
    '    --motion-scale-emphasized: 1;',
    '  }',
    '}',
  );

  return lines.join('\n');
}

export {
  motionDurationPrimitive,
  motionEasingPrimitive,
  motionPrimitive,
  motionTransformPrimitive,
  motionDurationSemantic,
  motionEasingSemantic,
  motionTransitionSemantic,
  type MotionDurationPrimitiveToken,
  type MotionEasingPrimitiveToken,
  type MotionTransformPrimitiveToken,
  type MotionDurationSemanticToken,
  type MotionEasingSemanticToken,
  type MotionTransitionSemanticToken,
};
