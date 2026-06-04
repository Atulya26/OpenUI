import {
  primarySemantic,
  semanticByMode,
  staticSemantic,
  type ThemeMode,
} from './semantic/refs';
import { resolvePrimitiveRef, resolveSemanticRefs } from './resolve';

export type ColorTokens = {
  static: Record<keyof typeof staticSemantic, string>;
  primary: Record<keyof typeof primarySemantic, string>;
  bg: Record<string, string>;
  text: Record<string, string>;
  stroke: Record<string, string>;
  icon: Record<string, string>;
  state: Record<string, Record<string, string>>;
};

function buildTheme(mode: ThemeMode): ColorTokens {
  const modeSemantic = semanticByMode[mode];

  return {
    static: Object.fromEntries(
      Object.entries(staticSemantic).map(([k, ref]) => [
        k,
        resolvePrimitiveRef(ref),
      ]),
    ) as ColorTokens['static'],
    primary: Object.fromEntries(
      Object.entries(primarySemantic).map(([k, ref]) => [
        k,
        resolvePrimitiveRef(ref),
      ]),
    ) as ColorTokens['primary'],
    bg: resolveSemanticRefs(modeSemantic.bg),
    text: resolveSemanticRefs(modeSemantic.text),
    stroke: resolveSemanticRefs(modeSemantic.stroke),
    icon: resolveSemanticRefs(modeSemantic.icon),
    state: {
      faded: resolveSemanticRefs(modeSemantic.state.faded),
      information: resolveSemanticRefs(modeSemantic.state.information),
      warning: resolveSemanticRefs(modeSemantic.state.warning),
      error: resolveSemanticRefs(modeSemantic.state.error),
      success: resolveSemanticRefs(modeSemantic.state.success),
    },
  };
}

export const lightTokens = buildTheme('light');
export const darkTokens = buildTheme('dark');

export const themes = {
  light: lightTokens,
  dark: darkTokens,
} as const;
