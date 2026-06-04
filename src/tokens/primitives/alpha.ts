/**
 * Alpha primitives — Align UI 2.0 Color Palette [Overview] — Alpha Colors section
 */

export type AlphaOpacity = 10 | 16 | 24;

export type AlphaFamily =
  | 'neutral'
  | 'blue'
  | 'orange'
  | 'red'
  | 'green'
  | 'yellow'
  | 'sky'
  | 'purple'
  | 'pink'
  | 'teal'
  | 'white'
  | 'black';

/** Base hex + opacity percent from Figma */
export const alphaBases: Record<AlphaFamily, string> = {
  neutral: '#99A0AE',
  blue: '#476CFF',
  orange: '#FA7319',
  red: '#FB3748',
  green: '#1FC16B',
  yellow: '#FBC64B',
  sky: '#47C2FF',
  purple: '#784DEF',
  pink: '#FB4BA3',
  teal: '#22D3BB',
  white: '#FFFFFF',
  black: '#171717',
};

export const alphaOpacities: AlphaOpacity[] = [24, 16, 10];

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function alphaColor(family: AlphaFamily, opacity: AlphaOpacity): string {
  const { r, g, b } = hexToRgb(alphaBases[family]);
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

/** Flat map: `blue-alpha-16` → rgba(...) */
export const primitiveAlpha = Object.fromEntries(
  (Object.keys(alphaBases) as AlphaFamily[]).flatMap((family) =>
    alphaOpacities.map((opacity) => [
      `${family}-alpha-${opacity}`,
      alphaColor(family, opacity),
    ] as const),
  ),
) as Record<`${AlphaFamily}-alpha-${AlphaOpacity}`, string>;
