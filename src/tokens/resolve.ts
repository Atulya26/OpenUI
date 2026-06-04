import { neutral, primitiveAlpha, primitiveColors } from './primitives';

const paletteLookup = {
  ...primitiveColors,
  neutral,
} as Record<string, Record<number, string> | undefined>;

/**
 * Resolve a primitive reference to a CSS color value.
 * @example resolvePrimitiveRef('blue.500') → '#335CFF'
 * @example resolvePrimitiveRef('blue-alpha-16') → 'rgba(...)'
 */
export function resolvePrimitiveRef(ref: string): string {
  if (ref in primitiveAlpha) {
    return primitiveAlpha[ref as keyof typeof primitiveAlpha];
  }

  const [palette, stepStr] = ref.split('.');
  const scale = paletteLookup[palette];
  if (!scale) {
    throw new Error(`Unknown palette in ref "${ref}"`);
  }

  const step = Number(stepStr) as keyof typeof scale;
  const value = scale[step];
  if (!value) {
    throw new Error(`Unknown step "${stepStr}" in palette "${palette}"`);
  }

  return value;
}

function flattenRefs(
  obj: Record<string, unknown>,
  prefix = '',
): Record<string, string> {
  const out: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}-${key}` : key;
    if (typeof value === 'string') {
      out[path] = value;
    } else if (value && typeof value === 'object') {
      Object.assign(out, flattenRefs(value as Record<string, unknown>, path));
    }
  }

  return out;
}

export function resolveSemanticRefs(
  refs: Record<string, unknown>,
): Record<string, string> {
  const flat = flattenRefs(refs);
  return Object.fromEntries(
    Object.entries(flat).map(([k, ref]) => [k, resolvePrimitiveRef(ref)]),
  );
}
