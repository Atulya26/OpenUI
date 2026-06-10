/**
 * OpenUI shadow primitives.
 */

export const shadowPrimitive = {
  none: 'none',
  ring: {
    canvas: 'var(--color-bg-white0)',
    stroke: 'var(--color-stroke-soft200)',
    neutralInk: 'color-mix(in srgb, var(--color-bg-strong950) 84%, transparent)',
    focusPrimary: 'color-mix(in srgb, var(--color-primary-base) 12%, transparent)',
    focusNeutral: 'color-mix(in srgb, var(--color-bg-strong950) 12%, transparent)',
    focusError: 'color-mix(in srgb, var(--color-state-error-base) 12%, transparent)',
  },
  regular: {
    xSmall:
      '0px 1px 2px 0px rgba(10, 13, 20, 0.03)',
    medium:
      '0px 16px 32px -12px rgba(14, 18, 27, 0.1)',
  },
  card: {
    large:
      'inset 0px -1px 1px -0.5px rgba(23, 23, 23, 0.06), 0px 0px 0px 1px rgba(23, 23, 23, 0.08), 0px 1px 1px -0.5px rgba(23, 23, 23, 0.04), 0px 3px 3px -1.5px rgba(23, 23, 23, 0.04), 0px 6px 6px -3px rgba(23, 23, 23, 0.04), 0px 10px 10px -5px rgba(23, 23, 23, 0.04), 0px 20px 20px -10px rgba(23, 23, 23, 0.04)',
    mobile:
      '0px 0px 0px 1px var(--shadow-ring-stroke), 0px 2px 8px -4px rgba(23, 23, 23, 0.12)',
  },
  custom: {
    xSmall:
      'inset 0px -1px 1px -0.5px rgba(51, 51, 51, 0.06), 0px 0px 0px 1px var(--shadow-ring-stroke), 0px 1px 2px 0px rgba(51, 51, 51, 0.04), 0px 2px 4px 0px rgba(51, 51, 51, 0.04), 0px 4px 8px -2px rgba(51, 51, 51, 0.06)',
    small:
      '0px 1px 3px -1.5px rgba(51, 51, 51, 0.16), 0px 5px 5px -2.5px rgba(51, 51, 51, 0.08), 0px 12px 6px -6px rgba(51, 51, 51, 0.02), 0px 16px 8px -8px rgba(51, 51, 51, 0.01), 0px 0px 0px 1px rgba(51, 51, 51, 0.04), inset 0px -0.5px 0.5px 0px rgba(51, 51, 51, 0.08)',
    medium:
      'inset 0px -1px 1px -0.5px rgba(51, 51, 51, 0.06), 0px 0px 0px 1px var(--shadow-ring-stroke), 0px 48px 48px -24px rgba(51, 51, 51, 0.04), 0px 24px 24px -12px rgba(51, 51, 51, 0.04), 0px 12px 12px -6px rgba(51, 51, 51, 0.04), 0px 6px 6px -3px rgba(51, 51, 51, 0.04), 0px 3px 3px -1.5px rgba(51, 51, 51, 0.02), 0px 1px 1px 0.5px rgba(51, 51, 51, 0.04)',
    large:
      '0px 96px 96px -32px rgba(51, 51, 51, 0.06), 0px 48px 48px -24px rgba(51, 51, 51, 0.04), 0px 24px 24px -12px rgba(51, 51, 51, 0.04), 0px 12px 12px -6px rgba(51, 51, 51, 0.04), 0px 6px 6px -3px rgba(51, 51, 51, 0.04), 0px 3px 3px -1.5px rgba(51, 51, 51, 0.02), 0px 1px 1px 0.5px rgba(51, 51, 51, 0.04), 0px 0px 0px 1px rgba(51, 51, 51, 0.04), inset 0px -1px 1px -0.5px rgba(51, 51, 51, 0.06)',
  },
  colored: {
    gray:
      'inset 0px -1px 1px -0.5px rgba(23, 23, 23, 0.06), 0px 0px 0px 1px rgba(23, 23, 23, 0.04), 0px 1px 1px -0.5px rgba(23, 23, 23, 0.04), 0px 3px 3px -1.5px rgba(23, 23, 23, 0.04), 0px 6px 6px -3px rgba(23, 23, 23, 0.04), 0px 10px 10px -5px rgba(23, 23, 23, 0.04), 0px 20px 20px -10px rgba(23, 23, 23, 0.04)',
    blue:
      'inset 0px -1px 1px -0.5px rgba(18, 35, 104, 0.04), 0px 0px 0px 1px rgba(18, 35, 104, 0.04), 0px 1px 1px -0.5px rgba(18, 35, 104, 0.04), 0px 3px 3px -1.5px rgba(18, 35, 104, 0.04), 0px 6px 6px -3px rgba(18, 35, 104, 0.04), 0px 10px 10px -5px rgba(18, 35, 104, 0.04), 0px 20px 20px -10px rgba(18, 35, 104, 0.06)',
    purple:
      'inset 0px -1px 1px -0.5px rgba(53, 26, 117, 0.04), 0px 0px 0px 1px rgba(53, 26, 117, 0.04), 0px 1px 1px -0.5px rgba(53, 26, 117, 0.04), 0px 3px 3px -1.5px rgba(53, 26, 117, 0.04), 0px 6px 6px -3px rgba(53, 26, 117, 0.04), 0px 10px 10px -5px rgba(53, 26, 117, 0.04), 0px 20px 20px -10px rgba(53, 26, 117, 0.04)',
    orange:
      'inset 0px -1px 1px -0.5px rgba(113, 51, 10, 0.04), 0px 0px 0px 1px rgba(113, 51, 10, 0.04), 0px 1px 1px -0.5px rgba(113, 51, 10, 0.04), 0px 3px 3px -1.5px rgba(113, 51, 10, 0.04), 0px 6px 6px -3px rgba(113, 51, 10, 0.04), 0px 10px 10px -5px rgba(113, 51, 10, 0.04), 0px 20px 20px -10px rgba(113, 51, 10, 0.04)',
    green:
      'inset 0px -1px 1px -0.5px rgba(11, 70, 39, 0.04), 0px 0px 0px 1px rgba(11, 70, 39, 0.04), 0px 1px 1px -0.5px rgba(11, 70, 39, 0.04), 0px 3px 3px -1.5px rgba(11, 70, 39, 0.04), 0px 6px 6px -3px rgba(11, 70, 39, 0.04), 0px 10px 10px -5px rgba(11, 70, 39, 0.04), 0px 20px 20px -10px rgba(11, 70, 39, 0.04)',
    primary:
      'inset 0px -1px 1px -0.5px rgba(18, 35, 104, 0.04), 0px 0px 0px 1px rgba(18, 35, 104, 0.04), 0px 1px 1px -0.5px rgba(18, 35, 104, 0.04), 0px 3px 3px -1.5px rgba(18, 35, 104, 0.04), 0px 6px 6px -3px rgba(18, 35, 104, 0.04), 0px 10px 10px -5px rgba(18, 35, 104, 0.04), 0px 20px 20px -10px rgba(18, 35, 104, 0.04)',
  },
  component: {
    tooltip:
      'inset 0px -1px 1px -0.5px rgba(23, 23, 23, 0.06), 0px 0px 0px 1px var(--shadow-ring-stroke), 0px 48px 48px -24px rgba(23, 23, 23, 0.04), 0px 24px 24px -12px rgba(23, 23, 23, 0.04), 0px 12px 12px -6px rgba(23, 23, 23, 0.04), 0px 6px 6px -3px rgba(23, 23, 23, 0.04), 0px 3px 3px -1.5px rgba(23, 23, 23, 0.02), 0px 1px 1px 0.5px rgba(23, 23, 23, 0.04)',
    buttonPrimaryFocus:
      '0px 0px 0px 4px var(--shadow-ring-focus-primary), 0px 0px 0px 2px var(--shadow-ring-canvas)',
    buttonImportantFocus:
      '0px 0px 0px 4px var(--shadow-ring-focus-neutral), 0px 0px 0px 2px var(--shadow-ring-canvas)',
    buttonErrorFocus:
      '0px 0px 0px 4px var(--shadow-ring-focus-error), 0px 0px 0px 2px var(--shadow-ring-canvas)',
    fancyButtonNeutral:
      '0px 0px 0px 1px var(--shadow-ring-neutral-ink), 0px 1px 2px 0px rgba(27, 28, 29, 0.48)',
    fancyButtonPrimary:
      '0px 0px 0px 1px var(--color-primary-base), 0px 1px 2px 0px rgba(14, 18, 27, 0.24)',
    fancyButtonError:
      '0px 0px 0px 1px var(--color-state-error-base), 0px 1px 2px 0px rgba(14, 18, 27, 0.24)',
    fancyButtonStroke:
      '0px 0px 0px 1px var(--shadow-ring-stroke), 0px 1px 3px 0px rgba(14, 18, 27, 0.12)',
    toggleSwitch:
      '0px 2px 4px 0px rgba(14, 18, 27, 0.03), 0px 6px 10px 0px rgba(14, 18, 27, 0.06)',
    customButton:
      'inset 0px -1px 1px -0.5px rgba(23, 23, 23, 0.04), 0px 0px 0px 1px rgba(23, 23, 23, 0.08), 0px 1px 1px -0.5px rgba(23, 23, 23, 0.04), 0px 3px 3px -1.5px rgba(23, 23, 23, 0.04), 0px 6px 6px -3px rgba(23, 23, 23, 0.04)',
    customButtonHover: '0px 0px 0px 1px rgba(23, 23, 23, 0.08)',
    customInputDefault:
      '0px 0px 0px 1px rgba(23, 23, 23, 0.08), 0px 1px 1px -0.5px rgba(23, 23, 23, 0.04), 0px 3px 3px -1.5px rgba(23, 23, 23, 0.04)',
    customInputHover: '0px 0px 0px 1px rgba(23, 23, 23, 0.08)',
    customInputActive:
      '0px 0px 0px 1.4px var(--color-primary-base), 0px 1px 1px -0.5px rgba(23, 23, 23, 0.04), 0px 3px 3px -1.5px rgba(23, 23, 23, 0.04), 0px 6px 6px -3px rgba(23, 23, 23, 0.02)',
  },
} as const;
