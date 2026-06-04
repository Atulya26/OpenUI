import {
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  type FontSizeToken,
} from './primitives/typography';
import {
  textStyles,
  typographyRoles,
  type TextStyleName,
  type TypographyPrimitiveRef,
  type TypographyRole,
} from './semantic/typography';

export type TypographyToken = {
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing: string;
};

function resolveStyle(ref: TypographyPrimitiveRef): TypographyToken {
  const size = ref.size as FontSizeToken;
  return {
    fontFamily: fontFamily[ref.family],
    fontSize: `${fontSize[size]}px`,
    lineHeight: `${lineHeight[size]}px`,
    fontWeight: fontWeight[ref.weight],
    letterSpacing: letterSpacing[size],
  };
}

/** Resolved iOS-style text styles */
export const typographyTokens = Object.fromEntries(
  Object.entries(textStyles).map(([name, ref]) => [name, resolveStyle(ref)]),
) as Record<TextStyleName, TypographyToken>;

/** Resolved product roles */
export const roleTypographyTokens = Object.fromEntries(
  Object.entries(typographyRoles).map(([role, styleName]) => [
    role,
    typographyTokens[styleName],
  ]),
) as Record<TypographyRole, TypographyToken>;

export function typographyToCssProperties(token: TypographyToken): string {
  return [
    `font-family: ${token.fontFamily}`,
    `font-size: ${token.fontSize}`,
    `line-height: ${token.lineHeight}`,
    `font-weight: ${token.fontWeight}`,
    `letter-spacing: ${token.letterSpacing}`,
  ].join('; ');
}

export function typographyToCssVars(
  prefix: string,
  token: TypographyToken,
): Record<string, string> {
  const p = prefix ? `${prefix}-` : '';
  return {
    [`--font-${p}family`]: token.fontFamily,
    [`--font-${p}size`]: token.fontSize,
    [`--font-${p}line-height`]: token.lineHeight,
    [`--font-${p}weight`]: String(token.fontWeight),
    [`--font-${p}letter-spacing`]: token.letterSpacing,
  };
}

/** CSS custom properties for all text styles: --text-body-* */
export function buildTypographyCssVariables(): string {
  const lines: string[] = [];

  for (const [name, token] of Object.entries(typographyTokens)) {
    const kebab = name.replace(/([A-Z])/g, '-$1').toLowerCase();
    lines.push(`  --text-${kebab}-font-family: ${token.fontFamily};`);
    lines.push(`  --text-${kebab}-font-size: ${token.fontSize};`);
    lines.push(`  --text-${kebab}-line-height: ${token.lineHeight};`);
    lines.push(`  --text-${kebab}-font-weight: ${token.fontWeight};`);
    lines.push(`  --text-${kebab}-letter-spacing: ${token.letterSpacing};`);
  }

  return `:root {\n${lines.join('\n')}\n}`;
}
