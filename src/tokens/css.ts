import { darkTokens, lightTokens } from './themes';
import type { ColorTokens } from './themes';

function toKebab(key: string): string {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase();
}

function tokensToCssVars(
  namespace: string,
  tokens: Record<string, string>,
): string[] {
  return Object.entries(tokens).map(
    ([key, value]) => `  --color-${namespace}-${toKebab(key)}: ${value};`,
  );
}

function stateTokensToCss(state: ColorTokens['state']): string[] {
  return Object.entries(state).flatMap(([group, tokens]) =>
    tokensToCssVars(`state-${group}`, tokens),
  );
}

/** Emit CSS custom properties for a resolved token set */
export function tokensToCssBlock(tokens: ColorTokens, selector: string): string {
  const lines: string[] = [
    ...tokensToCssVars('static', tokens.static),
    ...tokensToCssVars('primary', tokens.primary),
    ...tokensToCssVars('bg', tokens.bg),
    ...tokensToCssVars('text', tokens.text),
    ...tokensToCssVars('stroke', tokens.stroke),
    ...tokensToCssVars('icon', tokens.icon),
    ...tokensToCssVars('overlay', tokens.overlay),
    ...stateTokensToCss(tokens.state),
    ...tokensToCssVars('state-layer', tokens.stateLayer),
  ];

  return `${selector} {\n${lines.join('\n')}\n}`;
}

export const lightThemeCss = tokensToCssBlock(
  lightTokens,
  ':root, :root[data-theme="light"]',
);

export const darkThemeCss = tokensToCssBlock(
  darkTokens,
  ':root[data-theme="dark"]',
);

export const tokensStylesheet = `${lightThemeCss}\n\n${darkThemeCss}`;
