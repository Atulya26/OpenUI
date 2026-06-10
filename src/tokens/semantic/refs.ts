/**
 * Semantic color references — map to primitive paths (palette.step or alpha key)
 *
 * `neutral.*` uses the OpenUI gray primitive scale.
 */

export type PrimitiveRef = string;

/** Same in light & dark */
export const staticSemantic = {
  black: 'neutral.950',
  white: 'neutral.0',
} as const satisfies Record<string, PrimitiveRef>;

/** Brand primary — same in both modes */
export const primarySemantic = {
  dark: 'blue.800',
  darker: 'blue.700',
  base: 'blue.500',
  alpha16: 'blue-alpha-16',
  alpha10: 'blue-alpha-10',
} as const satisfies Record<string, PrimitiveRef>;

export type ThemeMode = 'light' | 'dark';

type SemanticGroup = Record<string, PrimitiveRef>;

/** Mode-specific semantic references */
export const semanticByMode = {
  light: {
    bg: {
      strong950: 'neutral.950',
      surface800: 'neutral.800',
      sub300: 'neutral.300',
      soft200: 'neutral.200',
      weak50: 'neutral.50',
      white0: 'neutral.0',
    },
    text: {
      strong950: 'neutral.950',
      sub600: 'neutral.600',
      soft400: 'neutral.400',
      disabled300: 'neutral.300',
      white0: 'neutral.0',
    },
    stroke: {
      strong950: 'neutral.950',
      sub300: 'neutral.300',
      soft200: 'neutral.200',
      white0: 'neutral.0',
    },
    icon: {
      strong950: 'neutral.950',
      sub600: 'neutral.600',
      soft400: 'neutral.400',
      disabled300: 'neutral.300',
      white0: 'neutral.0',
    },
    state: {
      faded: {
        dark: 'neutral.800',
        base: 'neutral.500',
        light: 'neutral.200',
        lighter: 'neutral.100',
      },
      information: {
        dark: 'blue.950',
        base: 'blue.500',
        light: 'blue.200',
        lighter: 'blue.50',
      },
      warning: {
        dark: 'orange.950',
        base: 'orange.500',
        light: 'orange.200',
        lighter: 'orange.50',
      },
      error: {
        dark: 'red.950',
        base: 'red.500',
        light: 'red.200',
        lighter: 'red.50',
      },
      success: {
        dark: 'green.950',
        base: 'green.500',
        light: 'green.200',
        lighter: 'green.50',
      },
    },
    stateLayer: {
      pressedNeutral: 'black-alpha-8',
      pressedPrimary: 'blue-alpha-16',
      pressedOnFill: 'white-alpha-12',
      pressedDanger: 'red-alpha-16',
      selected: 'blue-alpha-10',
    },
  },
  dark: {
    bg: {
      strong950: 'neutral.0',
      surface800: 'neutral.200',
      sub300: 'neutral.600',
      soft200: 'neutral.700',
      weak50: 'neutral.800',
      white0: 'neutral.950',
    },
    text: {
      strong950: 'neutral.0',
      sub600: 'neutral.400',
      soft400: 'neutral.500',
      disabled300: 'neutral.600',
      white0: 'neutral.950',
    },
    stroke: {
      strong950: 'neutral.0',
      sub300: 'neutral.600',
      soft200: 'neutral.700',
      white0: 'neutral.950',
    },
    icon: {
      strong950: 'neutral.0',
      sub600: 'neutral.400',
      soft400: 'neutral.500',
      disabled300: 'neutral.600',
      white0: 'neutral.950',
    },
    state: {
      faded: {
        dark: 'neutral.300',
        base: 'neutral.500',
        light: 'neutral.700',
        lighter: 'neutral.800',
      },
      information: {
        dark: 'blue.400',
        base: 'blue.500',
        light: 'blue-alpha-24',
        lighter: 'blue-alpha-16',
      },
      warning: {
        dark: 'orange.400',
        base: 'orange.600',
        light: 'orange-alpha-24',
        lighter: 'orange-alpha-16',
      },
      error: {
        dark: 'red.400',
        base: 'red.500',
        light: 'red-alpha-24',
        lighter: 'red-alpha-16',
      },
      success: {
        dark: 'green.400',
        base: 'green.600',
        light: 'green-alpha-24',
        lighter: 'green-alpha-16',
      },
    },
    stateLayer: {
      pressedNeutral: 'white-alpha-10',
      pressedPrimary: 'blue-alpha-24',
      pressedOnFill: 'white-alpha-12',
      pressedDanger: 'red-alpha-24',
      selected: 'blue-alpha-16',
    },
  },
} as const satisfies Record<ThemeMode, Record<string, SemanticGroup | Record<string, SemanticGroup>>>;
