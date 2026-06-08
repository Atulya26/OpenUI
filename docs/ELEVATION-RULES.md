# Elevation & z-index rules

Rules for humans and AI when layering surfaces, overlays, and floating UI in OpenUI.

**Navigation:** [docs/README.md](./README.md) · [SHADOW](./SHADOW-RULES.md) · [PATTERN](./PATTERN-RULES.md) · [COMPONENT](./COMPONENT-RULES.md)

---

## Hard rules (never break)

1. **Tokens only** — Use `var(--z-*)`, `var(--z-overlay-*)`, or `var(--elevation-*-*)` bundles. No raw `z-index: 100` or `z-index: 9999` in product UI or components.

2. **Shadow + stack are separate concerns** — `--shadow-*` controls perceived depth; `--z-*` controls paint order. Elevation role bundles (`--elevation-card-shadow` + `--elevation-card-z`) pair them when both apply.

3. **One stacking context per overlay** — Render sheets, modals, popovers, and toasts in a **portal** at the document root (or app shell root). Do not nest overlays inside scrollable list items.

4. **Respect the global overlay order** — Lower layers must never paint above higher semantic roles. See the stack table below.

5. **Backdrops are not elevated surfaces** — Scrim/backdrop uses `--z-backdrop` with a color token (`--color-bg-*` + alpha). Do not put heavy box-shadow on backdrops.

6. **Mobile restraint** — Levels 4–5 (`--elevation-overlay-*`, `--elevation-modal-*`) are for sheets and dialogs. Avoid level 5 on inline cards.

7. **Local offsets only inside a band** — You may use `calc(var(--z-raised) + 1)` for sibling cards in the same context. Do not jump bands (e.g. `raised` → `modal`).

8. **`--z-index-max` is forbidden in product UI** — Reserved for Storybook/debug. Use semantic roles.

---

## How Apple HIG and Material 3 inform OpenUI

| Source | What we adopt |
|--------|----------------|
| **Apple HIG** | Presentation order: content → floating HUD → popovers → sheets → full-screen covers → alerts/toasts on top |
| **Material 3** | Elevation levels **0–5** with stronger shadows at higher levels; overlay priority (dropdown &lt; modal &lt; snackbar) |
| **OpenUI** | Gapped z-index scale + semantic roles that map to existing `--shadow-*` tokens |

Shadow values remain in [SHADOW-RULES.md](./SHADOW-RULES.md). This file owns **stacking order** and **elevation role bundles**.

---

## Token cheat sheet

| Need | CSS variables |
|------|----------------|
| Default screen content | `--z-base` |
| Card above sibling content | `--z-raised` + `--elevation-card-shadow` |
| Sticky tab / nav bar | `--z-sticky` |
| FAB / floating control | `--z-fab` + `--elevation-floating-shadow` |
| Menu / select dropdown | `--z-dropdown` or `--z-overlay-dropdown` |
| Modal backdrop / scrim | `--z-backdrop` (no shadow) |
| Bottom sheet / drawer | `--z-sheet` + `--elevation-overlay-shadow` |
| Dialog / full-screen cover | `--z-modal` + `--elevation-modal-shadow` |
| Tooltip / contextual popover | `--z-popover` |
| Toast / snackbar | `--z-toast` |
| Flat surface (level 0) | `--elevation-flat-shadow`, `--elevation-flat-z` |
| Resting chip / subtle lift | `--elevation-resting-*` |
| Default card bundle | `--elevation-card-*` |

---

## Global overlay stack (bottom → top)

| Order | Role | `--z-*` | Shadow bundle | HIG / M3 analog |
|-------|------|---------|---------------|-----------------|
| 1 | Base content | `--z-base` | `--elevation-flat-shadow` | M3 level 0 |
| 2 | Sticky chrome | `--z-sticky` | `--elevation-resting-shadow` | Nav bar / tab bar |
| 3 | Dropdown / menu | `--z-dropdown` | `--elevation-floating-shadow` | M3 menu |
| 4 | Backdrop | `--z-backdrop` | none | HIG dimming layer |
| 5 | Sheet | `--z-sheet` | `--elevation-overlay-shadow` | HIG sheet |
| 6 | Modal | `--z-modal` | `--elevation-modal-shadow` | HIG full-screen cover |
| 7 | Popover | `--z-popover` | `--elevation-floating-shadow` | HIG popover |
| 8 | Toast | `--z-toast` | `--elevation-floating-shadow` | M3 snackbar |

---

## Elevation levels (Material 3 scale)

| Level | Token | Shadow role | Typical mobile use |
|-------|-------|-------------|-------------------|
| 0 | `--elevation-level-0` | flat | Lists, plain backgrounds |
| 1 | `--elevation-level-1` | resting | Chips, subtle cards |
| 2 | `--elevation-level-2` | card | Default `Card` |
| 3 | `--elevation-level-3` | floating | FAB, menus, sticky bars |
| 4 | `--elevation-level-4` | overlay | Sheets, drawers |
| 5 | `--elevation-level-5` | modal | Dialogs (rare on inline UI) |

---

## Implementation patterns

### Card (inline)

```css
.openui-card {
  z-index: var(--elevation-card-z);
  box-shadow: var(--elevation-card-shadow);
}
```

### Bottom sheet (portal)

```css
.openui-sheet-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--z-backdrop);
  background: color-mix(in srgb, var(--color-bg-strong950) 48%, transparent);
}

.openui-sheet-panel {
  position: fixed;
  z-index: var(--z-sheet);
  box-shadow: var(--elevation-overlay-shadow);
}
```

### Dropdown (above sticky chrome, below modal)

```css
.openui-menu {
  position: absolute;
  z-index: var(--z-dropdown);
  box-shadow: var(--elevation-floating-shadow);
}
```

### Toast (always on top of modals)

```css
.openui-toast-region {
  position: fixed;
  z-index: var(--z-toast);
  pointer-events: none;
}
```

---

## AI checklist

- [ ] Read this file when adding overlays, sheets, modals, menus, or toasts  
- [ ] Only `var(--z-*)` / `var(--elevation-*-*)` for z-index and elevation bundles  
- [ ] Overlays portaled to root stacking context  
- [ ] Backdrop uses color, not shadow  
- [ ] Checked **Foundational → Effects → Elevation** in Storybook  
- [ ] Cross-checked shadow choice in [SHADOW-RULES.md](./SHADOW-RULES.md)  
- [ ] `npx tsc --noEmit` passes  

---

## File map

| File | Role |
|------|------|
| `src/tokens/primitives/zIndex.ts` | Numeric z-index scale |
| `src/tokens/primitives/elevationLevels.ts` | M3 levels 0–5 |
| `src/tokens/semantic/elevation.ts` | Semantic roles + shadow pairing |
| `src/tokens/elevation.css` | `--z-*`, `--elevation-*` CSS variables |
| `src/tokens/elevation.ts` | TS exports + CSS builder |
| `src/stories/effects/Elevation.stories.tsx` | Storybook reference |

---

## Do not

- Do not use `z-index: 9999` or arbitrary large numbers  
- Do not put modals inside `overflow: hidden` parents without a portal  
- Do not assign `--elevation-modal-shadow` to list rows or buttons  
- Do not duplicate z-index values outside `src/tokens/`  
- Do not confuse DeviceFrame local stacking (`storybook.css` 0/1/2) with app overlay tokens  
