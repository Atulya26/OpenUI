# Sizing rules — control height & density

Shared sizing contract for interactive controls. Controls do not invent their
own heights; they consume the `--control-height-*` / `--control-pad-x-*` scale.

## Hard rules (never break)

1. Interactive controls size from `--control-height-{sm,md,lg,xl}`. Rectangular
   controls also use `--control-pad-x-{sm,md,lg,xl}` for horizontal padding. No
   per-component `calc()` off `--layout-touch-target-min`.
2. The canonical size vocabulary is `sm | md | lg`. `xl` is reserved for a
   high-emphasis action height; it does not imply full width. Use `fullWidth`
   for width behavior.
3. Density is global: `data-density="compact"` retunes the scale through any
   ancestor element. Use `<Screen density="compact">` for product screens.
   Components do not read a density prop.
4. Compact `sm` and `md` may render below 44px visually, but focusable controls
   must expose an expanded touch area using `--layout-hit-area-inset-compact`.

## Cheat sheet

| Token | Comfortable | Compact |
|---|---|---|
| `--control-height-sm` | 44px | 36px |
| `--control-height-md` | 48px | 40px |
| `--control-height-lg` | 56px | 44px |
| `--control-height-xl` | 60px | 52px |
| `--control-pad-x-sm` | 12px | 8px |
| `--control-pad-x-md` | 16px | 12px |
| `--control-pad-x-lg` | 20px | 16px |
| `--control-pad-x-xl` | 24px | 20px |

## Decision table

| Context | Size | Density |
|---|---|---|
| Primary CTA, single-field forms | `md` / `lg` | comfortable |
| Single hero action in a mobile footer | `xl` + `fullWidth` | comfortable |
| Dense lists, settings rows, toolbars on small screens | `sm` / `md` | compact after expanded hit areas |
| Inline or secondary actions | `sm` | inherit |

## AI checklist

- [ ] New interactive control sizes from `--control-height-*`
- [ ] Rectangular controls pad from `--control-pad-x-*`
- [ ] Uses `sm | md | lg` vocabulary
- [ ] Uses `xl` only for a real 60px high-emphasis control, not as a width shortcut
- [ ] Renders correctly under `data-density="compact"`
- [ ] Compact focusable controls expose an expanded 44px touch area
- [ ] `npm run guardrails` and `npm run typecheck` pass

## File map

| What | Where |
|---|---|
| Token values, CSS source of truth | `src/tokens/layout.css` |
| Typed mirror | `src/tokens/semantic/layout.ts` (`layoutControl`) |
| Resolved map mirror | `src/tokens/layout.ts` |
| Density application | `src/components/Screen/Screen.tsx` (`density` prop) |
| Story | `src/stories/components/Density.stories.tsx` |

## Do not

- Hard-code control heights or read `--layout-touch-target-min` directly for sizing
- Add a per-component `density` or `compact` prop; density is global
- Ship compact primary touch targets before expanded hit areas
