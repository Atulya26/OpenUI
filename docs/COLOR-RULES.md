# Color rules

Rules for humans and AI when using color in this design system.  
Source: [Align UI 2.0](https://www.figma.com/design/uUbwmKRHEIIaSIUSoTsmL6/Align-UI-2.0--NEW-) (Figma nodes: Color Palette `2623-2287`, Token System `2645-344`).

**Navigation:** [docs/README.md](./README.md) · [TYPOGRAPHY](./TYPOGRAPHY-RULES.md) · [ICON](./ICON-RULES.md) · [LAYOUT](./LAYOUT-RULES.md) · [COMPONENT](./COMPONENT-RULES.md) · [PATTERN](./PATTERN-RULES.md)

---

## Hard rules (never break)

1. **No hard-coded colors** — Use `var(--color-*)` only. No `#335cff`, `rgb()`, or Tailwind color classes in product UI.

2. **Semantic tokens in UI** — Components and screens use resolved semantic variables:
   - `--color-bg-*`, `--color-text-*`, `--color-stroke-*`, `--color-icon-*`
   - `--color-primary-*`, `--color-state-{name}-*`
   - Not primitive names like `gray.500` or hex from `primitiveColors`.

3. **Primitives are internal** — `src/tokens/primitives/colors.ts` and ramps are for token resolution and Storybook **Foundational → Colors → Primitives** only.

4. **Theme-aware** — Colors must read correctly in **light and dark**. Set `data-theme` on `document.documentElement`; variables swap in `tokens.css`.

5. **Neutral = gray scale** — Semantic `neutral.*` references the **gray** primitive ramp per Align UI convention.

6. **State colors for feedback only** — `state.information`, `warning`, `error`, `success`, `faded` are for alerts, banners, badges, validation — not default text or backgrounds.

7. **Contrast** — Primary text on backgrounds must meet readable contrast. Prefer `text-strong950` on `bg-white0` / `bg-weak50`; use `text-sub600` for secondary, not for primary body on tinted state backgrounds without checking contrast.

8. **Static black/white** — `--color-static-black` and `--color-static-white` do not flip in dark mode (overlays, media). For theme-aware surfaces use `bg-*` / `text-*` semantic tokens.

---

## Token cheat sheet

| Need | CSS variable | Notes |
|------|----------------|-------|
| Page background | `--color-bg-weak50` | Default canvas |
| Card / panel surface | `--color-bg-white0` | Elevated surface |
| Primary text | `--color-text-strong950` | Headings, body |
| Secondary text | `--color-text-sub600` | Descriptions, meta |
| Tertiary / placeholder | `--color-text-soft400` | Hints only |
| Disabled text | `--color-text-disabled300` | Disabled controls |
| Border / divider | `--color-stroke-soft200` | Default border |
| Strong border | `--color-stroke-sub300` | Emphasized divider |
| Brand / link / CTA | `--color-primary-base` | Buttons, links |
| Brand subtle fill | `--color-primary-alpha10` | Selected row tint |
| Error | `--color-state-error-base` | Errors, destructive emphasis |
| Success | `--color-state-success-base` | Success states |
| Warning | `--color-state-warning-base` | Warnings |
| Info | `--color-state-information-base` | Informational |

Icon colors mirror text: `--color-icon-strong950`, `--color-icon-sub600`, etc.

---

## Layer model

```
primitives/colors.ts  →  gray.500, blue.500, …
semantic/refs.ts      →  text.strong950 → neutral.950 (light)
themes.ts             →  resolved hex per mode
tokens.css            →  --color-text-strong950: #171717 (light)
```

**In components:** only the CSS variable layer.

---

## Light vs dark

| Role | Light (concept) | Dark (concept) |
|------|-----------------|----------------|
| Main background | Near white | Near black |
| Primary text | Near black | Near white |
| `bg-white0` | White surface | Dark surface |

Do not manually invert colors in components — rely on `data-theme`.

---

## When to use which token

| UI element | Token |
|------------|--------|
| Screen canvas | `bg-weak50` |
| Card, modal, sheet | `bg-white0` + `stroke-soft200` |
| Primary button fill | `primary-base` + `text-white0` on button |
| Secondary button | `bg-soft200` or outline with `stroke-soft200` |
| List row separator | `stroke-soft200` |
| Destructive action | `state-error-base` (not random red hex) |
| Success toast | `state-success-lighter` bg + `state-success-dark` text |

---

## AI follow-up checklist (every color change)

- [ ] Only `var(--color-*)` in component CSS/JSX styles
- [ ] No new hex values outside `src/tokens/primitives/`
- [ ] Checked light **and** dark in Storybook theme toolbar
- [ ] State colors used only for semantic feedback
- [ ] Primary brand uses `primary-*`, not raw `blue.500`
- [ ] If adding a semantic role: updated `semantic/refs.ts`, `themes.ts`, `tokens.css`

---

## Allowed exceptions (comment in PR)

- **Data visualizations** — charts may need a fixed palette; define in `src/tokens/` first
- **Images / video** — no color token required for media content
- **Storybook demos** — doc chrome may use tokens only (already required in `storybook.css`)

---

## File map

| What | Where |
|------|--------|
| Primitive ramps | `src/tokens/primitives/colors.ts`, `alpha.ts` |
| Semantic refs | `src/tokens/semantic/refs.ts` |
| Resolved themes | `src/tokens/themes.ts` |
| CSS variables | `src/tokens/tokens.css` |
| JSON export | `src/tokens/data/palette.json` |
| Storybook | Foundational → Colors |
| Master index | [docs/README.md](./README.md) |

---

## Do not

- Import `primitiveColors.gray[500]` directly in components
- Use Material or Tailwind default palettes alongside this system
- Add new brand colors without Align/Figma alignment
- Use `state-*-lighter` as full-screen backgrounds without hierarchy
- Assume `white0` is always `#ffffff` — it is theme-dependent
