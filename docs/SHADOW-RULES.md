# Shadow rules

Rules for humans and AI when using shadows in OpenUI. For **stacking order and z-index**, see [ELEVATION-RULES.md](./ELEVATION-RULES.md).

**Navigation:** [docs/README.md](./README.md) · [ELEVATION](./ELEVATION-RULES.md) · [RADIUS](./RADIUS-RULES.md) · [LAYOUT](./LAYOUT-RULES.md) · [COMPONENT](./COMPONENT-RULES.md)

---

## Hard rules (never break)

1. **No ad-hoc box-shadow** — Use `var(--shadow-*)` only in product UI and components. Do not paste multi-layer stacks from Figma into component CSS.

2. **Primitives are internal** — Full stacks live in `src/tokens/primitives/shadows.ts` and `shadows.css`. Storybook **Foundational → Effects → Shadows** shows all families.

3. **Semantic first in product UI** — Prefer `--shadow-elevation-subtle`, `--shadow-surface-card`, `--shadow-surface-custom-xs`, etc., unless a component rule calls for a specific OpenUI primitive.

4. **Component tokens are reserved** — `--shadow-component-*` variables are OpenUI component effect roles. Wire them when building Button, Input, Tooltip, Toggle — do not duplicate values.

5. **Mobile restraint** — Avoid `--shadow-custom-large` on phone screens (heavy 96px blur). Use `regular`, `card`, or `custom` xs–md for mobile surfaces.

6. **Theme-aware rings** — Focus and inset ring colors use `--shadow-ring-*` tokens, not baked light-mode hex. `src/tokens/shadows.css` owns dark-theme shadow recalibration.

---

## Token cheat sheet

| Need | CSS variable |
|------|----------------|
| No elevation | `--shadow-none` or `--shadow-elevation-none` |
| Subtle lift | `--shadow-regular-x-small` or `--shadow-elevation-subtle` |
| Modal / sheet depth | `--shadow-regular-medium` or `--shadow-elevation-raised` |
| Default card | `--shadow-card-large` or `--shadow-surface-card` |
| Input / chip elevation | `--shadow-custom-x-small` or `--shadow-surface-custom-xs` |
| Raised panel | `--shadow-custom-small` / `--shadow-custom-medium` |
| Brand-tinted card | `--shadow-colored-primary` (or blue, green, …) |
| Button focus | `--shadow-component-button-primary-focus` |
| Input default | `--shadow-component-custom-input-default` |
| Input focus | `--shadow-component-custom-input-active` |
| Focus ring inner surface | `--shadow-ring-canvas` |
| Neutral ring / inset stroke | `--shadow-ring-stroke` |

---

## Families

| Family | Variables | Use |
|--------|-----------|-----|
| **Regular** | `--shadow-regular-x-small`, `--shadow-regular-medium` | Simple elevation |
| **Card** | `--shadow-card-large` | Default card stack |
| **Custom** | `--shadow-custom-x-small` … `--shadow-custom-large` | Neutral layered surfaces |
| **Colored** | `--shadow-colored-gray` … `--shadow-colored-primary` | Hue-matched elevation |
| **Components** | `--shadow-component-*` | Per-component states (pre-wired for future DS components) |

## Core primitive wiring

| Component | Radius | Shadow |
|-----------|--------|--------|
| `Button` | `--radius-control` | Fancy button and focus component shadows by variant |
| `Input` | `--radius-control` | Custom input default, hover, and active shadows |
| `Card` `surface` | `--radius-surface` | `--shadow-surface-card` |
| `Card` `soft` | `--radius-surface` | `--shadow-elevation-subtle` |
| `Card` `outline` | `--radius-surface` | `--shadow-elevation-none` |

---

## AI checklist

- [ ] Read this file when adding elevation to a component or pattern  
- [ ] Only `var(--shadow-*)` in component CSS  
- [ ] No new shadow stacks outside `src/tokens/`  
- [ ] No baked hex colors in `src/tokens/shadows.css`; use ring/color variables
- [ ] Checked **Foundational → Effects → Shadows** in Storybook  
- [ ] Mobile: avoided `custom-large` unless intentional  
- [ ] `npx tsc --noEmit` passes  

---

## File map

| File | Role |
|------|------|
| `src/tokens/primitives/shadows.ts` | Source stacks |
| `src/tokens/semantic/shadows.ts` | Semantic role aliases |
| `src/tokens/shadows.css` | `--shadow-*` CSS variables |
| `src/tokens/shadows.ts` | TS helpers + `buildShadowCssVariables()` |
| `src/stories/effects/Shadows.stories.tsx` | Storybook catalog |

---

## Do not

- Copy Figma `box-shadow` strings into `Button.css` or `Card.css`  
- Use Tailwind `shadow-md` or arbitrary shadow utilities  
- Use `--shadow-custom-large` for every card on a 402px-wide screen  
- Confuse focus **outline** tokens (`--layout-focus-ring-*`) with focus **shadow** tokens (`--shadow-component-button-*-focus`)
