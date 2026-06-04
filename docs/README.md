# Design system rules — master index

**OpenUI** — mobile design system (CSS class prefix: `.openui-*`).

**Start here.** This file tells humans and AI **which rules to read**, in what order, and where the code lives.

Entry point from repo root: **[AGENTS.md](../AGENTS.md)** (short summary + link back here).

---

## How to use this guide (AI workflow)

### Step 1 — Identify what you are building

| You are… | Read these rules (in order) |
|----------|----------------------------|
| Any UI work | This file → global checklist below |
| Colors / themes / surfaces | [COLOR-RULES.md](./COLOR-RULES.md) |
| Text / labels / headings | [TYPOGRAPHY-RULES.md](./TYPOGRAPHY-RULES.md) |
| Icons | [ICON-RULES.md](./ICON-RULES.md) |
| iPhone canvas, safe areas, Figma iOS 26 sync | [DEVICE-RULES.md](./DEVICE-RULES.md) · [FIGMA-IOS26-REFERENCE.md](./FIGMA-IOS26-REFERENCE.md) |
| Spacing / insets / grid | [LAYOUT-RULES.md](./LAYOUT-RULES.md) |
| New or changed **component** (Button, Input, …) | [COMPONENT-RULES.md](./COMPONENT-RULES.md) + all foundational rules that apply |
| Screen / flow / composite UI | [PATTERN-RULES.md](./PATTERN-RULES.md) + component + foundational rules |

### Step 2 — Read the rule file(s)

Each `*-RULES.md` file contains:

1. **Hard rules** — never break  
2. **Token cheat sheet** — what to use  
3. **Decision tables** — when to use which token  
4. **AI checklist** — verify before finishing  
5. **File map** — exact paths in the codebase  
6. **Do not** — common mistakes  

### Step 3 — Open the codebase files listed in that rule file

Rules describe *behavior*; TypeScript/CSS is the *source of truth*. Always confirm tokens in `src/tokens/` before inventing values.

### Step 4 — Verify in Storybook

```bash
npm run storybook   # http://localhost:6006
```

| Foundational area | Storybook path |
|-------------------|----------------|
| Colors | Foundational → Colors |
| Typography | Foundational → Typography |
| Icons | Foundational → Icons |
| Layout | Foundational → Layout |

### Step 5 — Run the global checklist (below)

---

## Rule files

| File | Scope |
|------|--------|
| [COLOR-RULES.md](./COLOR-RULES.md) | Primitives, semantic color roles, light/dark, state colors |
| [TYPOGRAPHY-RULES.md](./TYPOGRAPHY-RULES.md) | Inter families, HIG text styles, product roles |
| [ICON-RULES.md](./ICON-RULES.md) | Lucide, `Icon` wrapper, sizes, a11y, tree-shaking |
| [DEVICE-RULES.md](./DEVICE-RULES.md) | iPhone 402×874, safe areas, Dynamic Island |
| [LAYOUT-RULES.md](./LAYOUT-RULES.md) | Spacing scale, insets, gaps, touch targets, grid |
| [COMPONENT-RULES.md](./COMPONENT-RULES.md) | How to author DS components (API, tokens, a11y) |
| [PATTERN-RULES.md](./PATTERN-RULES.md) | Composite mobile patterns (forms, lists, nav, sheets) |

---

## Global hard rules (every change)

1. **iPhone app** — **402×874** logical screen (iPhone 16 / 17 Pro class). Safe top **62px**, bottom **34px**. Content margins **16px** horizontal inside safe area. Not a web dashboard. No desktop-first layouts or Align dashboard type sizes (40px+). Details: [DEVICE-RULES.md](./DEVICE-RULES.md) · [LAYOUT-RULES.md](./LAYOUT-RULES.md).
2. **Tokens only** — use CSS variables (`--color-*`, `--text-*`, `--layout-*`, `--device-*`). No hard-coded hex, rgb, or arbitrary px for spacing/type.
3. **Semantic over primitive** — product UI uses semantic tokens (`--color-text-sub600`), not primitive ramps (`gray.600`), except in token definitions and Storybook primitives stories.
4. **Light + dark** — UI must work with `data-theme="light"` \| `"dark"` on `<html>`. Never assume light-only.
5. **One source of truth** — change tokens in `src/tokens/`, then CSS, then components. Do not fork values in Storybook-only CSS for product patterns.
6. **Device chrome** — Status bar, Dynamic Island, and home indicator come from the **hardware frame PNG** in Storybook (`DeviceFrame`). Do not recreate them with icons, SVG, or extra overlays. Product UI uses `.openui-app-screen` + `.openui-app-content`.
7. **Align UI 2.0 + HIG** — colors from Align Figma; typography & layout informed by [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/); spacing structure from [Material 3 layout](https://m3.material.io/foundations/layout/layout-overview/overview) where noted.
8. **Storybook** — new tokens or components need a Foundational or Components story.

---

## Global AI checklist (before marking work done)

- [ ] Read the rule file(s) for every foundational area touched  
- [ ] No magic numbers for color, type, spacing, or icon size  
- [ ] Safe areas respected: no primary UI in top **62px** / bottom **34px** ([DEVICE-RULES.md](./DEVICE-RULES.md))  
- [ ] Screen content uses **16px** horizontal margins (`--layout-inset-screen-x`), not 24px  
- [ ] Storybook screens use `<DeviceFrame>` without extra status bar / island / home overlays  
- [ ] Theme toggle: checked light and dark  
- [ ] Touch targets ≥ `var(--layout-touch-target-min)` for interactive UI  
- [ ] `npx tsc --noEmit` passes  
- [ ] Relevant Storybook section reviewed or updated  
- [ ] If adding a component: [COMPONENT-RULES.md](./COMPONENT-RULES.md) checklist complete  
- [ ] If building a screen: [PATTERN-RULES.md](./PATTERN-RULES.md) checklist complete  

---

## Repository map

```
src/tokens/
  primitives/     colors, alpha, typography, spacing
  semantic/       refs (color), typography, layout
  device/         iphone.ts — screen, safe area, frame asset
  themes.ts       resolved light/dark colors
  tokens.css      --color-*
  typography.css  --text-*
  layout.css      --space-*, --layout-*, --device-*

src/index.ts      package entry: components + tokens
src/styles.css    package CSS entry: color + type + layout + app shell
src/components/   DS components (Icon, Text, Stack, Screen, Button, Input, Field, Card, ListRow)
src/storybook/    DeviceFrame, Lucide catalog (preview only)
src/assets/devices/  iphone-17-pro-frame.png (bundled)
public/devices/   static copy of frame PNG
src/styles/       global.css (.openui-app-screen), storybook.css
src/stories/      Storybook: foundational + components
docs/             *-RULES.md (you are here)
AGENTS.md         AI entry point
```

---

## When rules conflict

1. **Hard rule in a specific `*-RULES.md`** beats general guidance  
2. **Token source code** beats Storybook copy if they disagree — fix the docs  
3. **Figma Align UI** beats ad-hoc aesthetics for color primitives  
4. **Apple HIG** beats Align for mobile typography sizes and touch targets  

---

## Adding a new foundational area

1. Add tokens under `src/tokens/`  
2. Add `docs/{AREA}-RULES.md` using the same sections as existing rule files  
3. Add Storybook stories under `Foundational → {Area}`  
4. Link the new file in this README and in [AGENTS.md](../AGENTS.md)  
