# AI agent guide — OpenUI Design System

**Naming:** Design system **OpenUI** · CSS class prefix **`.openui-*`** · package `@openui/design-system`. Do not use “Inui” in docs, code, or class names.

You are working in a **mobile-first** React design system. **Read this file first**, then follow the linked rule files for each area you touch.

---

## Step 1 — Open the master index

**[docs/README.md](docs/README.md)** — workflow, global hard rules, global checklist, repo map.

---

## Step 2 — Read rule files for your task

| If you are changing… | Read |
|----------------------|------|
| Colors, themes, surfaces, borders | [docs/COLOR-RULES.md](docs/COLOR-RULES.md) |
| Text, headings, labels | [docs/TYPOGRAPHY-RULES.md](docs/TYPOGRAPHY-RULES.md) |
| Icons | [docs/ICON-RULES.md](docs/ICON-RULES.md) |
| iPhone screen, safe areas, Figma iOS 26 layout | [docs/DEVICE-RULES.md](docs/DEVICE-RULES.md) · [docs/FIGMA-IOS26-REFERENCE.md](docs/FIGMA-IOS26-REFERENCE.md) |
| Spacing, insets, grid, touch targets | [docs/LAYOUT-RULES.md](docs/LAYOUT-RULES.md) |
| Control sizing, density | [docs/SIZING-RULES.md](docs/SIZING-RULES.md) |
| Shadows | [docs/SHADOW-RULES.md](docs/SHADOW-RULES.md) |
| Z-index, elevation layering | [docs/ELEVATION-RULES.md](docs/ELEVATION-RULES.md) |
| Corner radius | [docs/RADIUS-RULES.md](docs/RADIUS-RULES.md) |
| Motion, transitions, animation | [docs/MOTION-RULES.md](docs/MOTION-RULES.md) |
| Visual taste, state language, Storybook presentation | [docs/VISUAL-LANGUAGE.md](docs/VISUAL-LANGUAGE.md) |
| A DS component (`src/components/`) | [docs/COMPONENT-RULES.md](docs/COMPONENT-RULES.md) · [docs/COMPONENT-CHECKLIST.md](docs/COMPONENT-CHECKLIST.md) + all relevant rows above |
| Parallel component batch work | [docs/COMPONENT-BATCH-WORKFLOW.md](docs/COMPONENT-BATCH-WORKFLOW.md) |
| A screen / form / list / flow | [docs/PATTERN-RULES.md](docs/PATTERN-RULES.md) + component + foundational rules |

Each `*-RULES.md` has: **hard rules → cheat sheet → decisions → AI checklist → file map**.

---

## Step 3 — Confirm in code & Storybook

| Area | Source of truth | Storybook |
|------|-----------------|-----------|
| Color | `src/tokens/tokens.css` | Foundational → Colors |
| Type | `src/tokens/typography.css` | Foundational → Typography |
| Icons | `src/components/Icon/`, `src/tokens/icons.ts` | Foundational → Icons |
| Device / frame | `src/tokens/device/iphone.ts`, `src/storybook/DeviceFrame.tsx`, `src/assets/devices/` | Foundational → Layout → Device |
| Layout | `src/tokens/layout.css`, `src/styles/global.css` | Foundational → Layout |
| Shadows | `src/tokens/shadows.css` | Foundational → Effects → Shadows |
| Elevation / z-index | `src/tokens/elevation.css` | Foundational → Effects → Elevation |
| Radius | `src/tokens/radius.css` | Foundational → Effects → Radius |
| Motion | `src/tokens/motion.css` | Foundational → Motion |

```bash
npm run storybook    # http://localhost:6006
npx tsc --noEmit
```

---

## Global hard rules (never break)

1. **Tokens only** — `var(--color-*)`, `var(--surface-*)`, `var(--text-*)`, `var(--layout-*)`, `var(--radius-*)`, `var(--shadow-*)`, `var(--z-*)`, `var(--elevation-*)`, `var(--motion-*)`, `var(--device-*)`; icon/token props for icons.
2. **iPhone 402×874** — safe top **62px**, bottom **34px**; content margins **16px** horizontal inside safe area ([DEVICE-RULES.md](docs/DEVICE-RULES.md), [LAYOUT-RULES.md](docs/LAYOUT-RULES.md)).
3. **Device frame** — Storybook uses `DeviceFrame` + `src/assets/devices/iphone-17-pro-frame.png` (chrome baked in). **Do not** add status bar, Dynamic Island, or home indicator overlays.
4. **Product shell** — `.openui-app-screen` (safe area) + `.openui-app-content` (layout margins) in `src/styles/global.css`.
5. **Mobile app** — not a web dashboard; no 12-col grids or 40px+ display type.
6. **Semantic over primitive** in product UI.
7. **Light + dark** — `data-theme` on `<html>`.
8. **Inter / Inter Display** only for typography.
9. **Lucide + `Icon` wrapper** — tree-shake imports; no arbitrary icon sizes/colors. Do not use Lucide for status bar chrome.

---

## Quick token reference

```
/* Color */
background: var(--color-bg-weak50);
color: var(--color-text-strong950);
border-color: var(--color-stroke-soft200);

/* Type */
font-family: var(--text-body-font-family);
font-size: var(--text-body-font-size);

/* Layout + device */
padding-top: var(--device-safe-area-top);      /* 62px */
padding-bottom: var(--device-safe-area-bottom); /* 34px */
padding-inline: var(--layout-inset-screen-x);  /* 16px — HIG/UIKit iPhone */
max-width: var(--device-screen-width);         /* 402px outer shell; 370px inner content */
gap: var(--layout-gap-stack-sm);
min-height: var(--layout-touch-target-min);

/* Radius + shadow */
border-radius: var(--radius-control);
box-shadow: var(--shadow-surface-card);

/* Motion */
transition: var(--motion-transition-feedback);

/* Icons */
<Icon icon={Home} size="md" color="strong" />
```

---

## Before you finish

Run the **global checklist** in [docs/README.md](docs/README.md) and the **area checklist** in each `*-RULES.md` you used.

---

## Do not

- Skip rule files because the task “seems small”
- Invent tokens in components — add them under `src/tokens/` first
- Mix other design systems (Tailwind defaults, MUI, shadcn) without token mapping
- Recreate iOS status bar / Dynamic Island / home indicator in code — use `DeviceFrame` PNG
- Put primary UI in top 62px or bottom 34px safe zones
