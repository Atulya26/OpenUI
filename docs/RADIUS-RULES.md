# Corner radius rules

Rules for humans and AI when using border radius in OpenUI.  
Source: [Align UI 2.0 — Corner Radius](https://www.figma.com/design/uUbwmKRHEIIaSIUSoTsmL6/Align-UI-2.0--NEW-?node-id=2839-15876&m=dev) (Figma node `2839:15876`).

**Navigation:** [docs/README.md](./README.md) · [SHADOW](./SHADOW-RULES.md) · [LAYOUT](./LAYOUT-RULES.md) · [DEVICE](./DEVICE-RULES.md) · [COMPONENT](./COMPONENT-RULES.md)

---

## Hard rules (never break)

1. **No arbitrary border-radius** — Use `var(--radius-*)` or legacy `var(--layout-radius-*)` aliases. No `border-radius: 10px` in product UI.

2. **Device radius is separate** — `--device-screen-radius` (58px) is for the iPhone frame aperture only. Do not use it for buttons, cards, or inputs.

3. **Semantic roles in components** — Use `--radius-control`, `--radius-surface`, `--radius-surface-lg`, and `--radius-pill` in components. `--layout-radius-*` aliases exist only for compatibility.

4. **Primitives in docs only** — Raw scale `--radius-2xs` … `--radius-28` is for Storybook and token definitions. Product UI should use semantic or layout aliases unless there is a documented exception.

5. **Pills use full** — Chips, tags, and circular controls use `--radius-pill` (`9999px`), not `--layout-radius-full` (now also maps to `9999px`; previously 64px on the spacing scale).

6. **Concentric nesting** — Inner radius ≈ outer radius − padding when nesting rounded containers (Apple HIG / Align guidance).

---

## Token cheat sheet

| Need | CSS variable | Value |
|------|----------------|-------|
| Sharp | `--radius-none` | 0 |
| Micro | `--radius-2xs` | 2px |
| Tag / badge | `--radius-xs` | 4px |
| Small control | `--radius-sm` | 6px |
| Button / input (primitive) | `--radius-md` | 8px |
| Button / input (semantic) | `--radius-control` | 10px (`--radius-lg`) |
| Card (semantic) | `--radius-surface` | 12px (`--radius-xl`) |
| Large card | `--radius-surface-lg` | 16px (`--radius-2xl`) |
| Hero / large container | `--radius-28` | 28px |
| Pill / avatar | `--radius-pill` | 9999px |
| Legacy alias (compat only) | `--layout-radius-md` | 12px |

---

## Primitive scale (Align UI)

| Token | px |
|-------|-----|
| `none` | 0 |
| `2xs` | 2 |
| `xs` | 4 |
| `sm` | 6 |
| `md` | 8 |
| `lg` | 10 |
| `xl` | 12 |
| `2xl` | 16 |
| `3xl` | 20 |
| `28` | 28 |
| `full` | 9999 |

---

## AI checklist

- [ ] Read this file when changing corner radius on a component  
- [ ] Components use semantic `var(--radius-*)` roles, not layout radius aliases  
- [ ] Did not use `--device-screen-radius` for UI chrome  
- [ ] Checked **Foundational → Effects → Radius** in Storybook  
- [ ] `npx tsc --noEmit` passes  

---

## File map

| File | Role |
|------|------|
| `src/tokens/primitives/radius.ts` | Px scale |
| `src/tokens/semantic/radius.ts` | Semantic + layout alias refs |
| `src/tokens/radius.css` | `--radius-*`, `--layout-radius-*` |
| `src/tokens/radius.ts` | TS helpers |
| `src/stories/effects/Radius.stories.tsx` | Storybook |

---

## Do not

- Use spacing scale steps (`--space-3`) as border-radius  
- Set `border-radius: 58px` on cards (that is the phone display)  
- Invent one-off radii (e.g. `11px`) — add a token via design review first
