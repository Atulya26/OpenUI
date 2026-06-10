/**
 * OpenUI surface material primitives.
 */

export const surfacePrimitive = {
  glass: {
    bg: 'color-mix(in srgb, var(--color-bg-white0) 72%, transparent)',
    bgStrong: 'color-mix(in srgb, var(--color-bg-white0) 86%, transparent)',
    border: 'color-mix(in srgb, var(--color-stroke-soft200) 78%, transparent)',
    blur: 'blur(20px) saturate(1.8)',
  },
} as const;
