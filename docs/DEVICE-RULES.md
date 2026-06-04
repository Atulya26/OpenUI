# Device rules (iPhone)

**OpenUI** · class prefix `.openui-*`

Rules for humans and AI — **all UI targets iPhone Pro class at 402×874 logical points.**

**Navigation:** [docs/README.md](./README.md) · [LAYOUT-RULES.md](./LAYOUT-RULES.md) · [FIGMA-IOS26-REFERENCE.md](./FIGMA-IOS26-REFERENCE.md)

---

## Hard rules (never break)

1. **Design canvas** — `402×874` pt (CSS px at 1×). Do not design for desktop widths or Android dp unless explicitly scoped.

2. **Safe areas** — Respect system insets. **No interactive or primary content** in these zones:
   - Top: **62px** (status bar + Dynamic Island)
   - Bottom: **34px** (home indicator)
   - Left/right: **0px** in portrait

3. **Use CSS variables** — `var(--device-safe-area-*)`, `var(--device-screen-*)`, `var(--device-content-*)`, not hard-coded `62` / `34` / `402` in components (except token definitions).

4. **Prefer `env(safe-area-inset-*)`** on real devices; token fallbacks for Storybook/desktop.

5. **Product screen shell** — Root screen uses `.openui-app-screen` + `.openui-app-content` (see [Layout + device stacking](#layout--device-stacking)).

6. **System chrome is not app UI** — Status bar (time, signal, Wi‑Fi, battery), Dynamic Island, and home indicator are **system chrome**. Do not rebuild them in app components, Lucide icons, or extra PNG overlays.

7. **Storybook `DeviceFrame`** — Uses a **single hardware PNG** with chrome baked in. **Never** add separate status-bar strips, island pills, or home-bar divs on top. See [DeviceFrame (Storybook)](#deviceframe-storybook-only).

8. **Full-bleed media** — Images/video may extend edge-to-edge horizontally; **text and controls** still respect safe areas and layout margins.

9. **No visible scrollbars** — iPhone screens may scroll, but product and Storybook mobile viewports hide scrollbar chrome.

10. **Layout margins ≠ status bar padding** — App content uses **16px** horizontal margins inside the safe area. Figma status bar internal padding (~24px) is chrome-only — see [LAYOUT-RULES.md](./LAYOUT-RULES.md).

---

## Specifications (iPhone 16 / 17 Pro class)

| Property | Value | Token / variable |
|----------|-------|------------------|
| Screen | 402 × 874 pt | `--device-screen-width`, `--device-screen-height` |
| Native | 1206 × 2622 px @3x | `iphoneProTarget` |
| Safe top | 62 pt | `--device-safe-area-top` |
| Safe bottom | 34 pt | `--device-safe-area-bottom` |
| Layout margin H | **16 pt** | `--layout-margin-horizontal` |
| Content width | **370 pt** | `--device-content-width` (402 − 32) |
| Usable content height | **778 pt** | `--device-content-height` (874 − 62 − 34) |
| Status bar height | 54 pt | `--device-status-bar-height` |
| Dynamic Island | 154 × 37 pt, top 21 pt | `--device-dynamic-island-*` |
| Home indicator zone | 34 pt tall, bar 134 × 5 pt | `--device-home-indicator-height` |

Figma sync: [FIGMA-IOS26-REFERENCE.md](./FIGMA-IOS26-REFERENCE.md) · `src/tokens/data/ios-layout-figma.json`

---

## Layout + device stacking

Three nested regions (portrait). **Do not skip layers.**

```
┌────────────── 402px screen ──────────────┐
│ ░░░ safe top 62px — NO app content ░░░░░ │  ← status bar + Dynamic Island
│ ┌──── layout margin 16px each side ────┐ │
│ │  Titles, lists, forms, CTAs          │ │  ← your UI
│ └──────────────────────────────────────┘ │
│ ░░ safe bottom 34px — NO app content ░░░ │  ← home indicator
└──────────────────────────────────────────┘
```

### Product UI (app / production)

```html
<div class="openui-app-screen">
  <div class="openui-app-content">
    <!-- screen content -->
  </div>
</div>
```

| Class | What it applies |
|-------|-----------------|
| `.openui-app-screen` | Safe area padding only (`--device-safe-area-*` + `env()`) |
| `.openui-app-content` | Layout margins inside safe area (`--layout-margin-horizontal`); outer box maxes at `--device-screen-width`, inner content resolves to `--device-content-width` |

Defined in `src/styles/global.css`.

### Storybook preview

`DeviceFrame` mirrors the same restrictions:

- Screen slot: **402×874** (inset inside 450×920 hardware asset)
- **Viewport** (children): inset by safe top/bottom + horizontal layout margin padding
- Visible scrollbars are hidden to match mobile UI behavior
- **Hardware PNG** on top: bezels + Dynamic Island + status bar + home indicator

---

## DeviceFrame (Storybook only)

**Not shipped in the app.** Used in Storybook to preview screens at iPhone scale.

### Asset (single source of truth for chrome)

| Item | Path |
|------|------|
| Bundled (required) | `src/assets/devices/iphone-17-pro-frame.png` |
| Static copy (optional) | `public/devices/iphone-17-pro-frame.png` |
| Asset size | **450 × 920** px, RGBA |
| Logical screen in asset | **402 × 874** (inset **24×23** px from asset edges) |
| Corner radius | **58px** at 1× (`iphoneFrameAsset.screenCornerRadius`) |

The PNG includes **bezels, Dynamic Island, status bar (9:41, indicators), and home indicator**. The screen center is transparent so story content shows through.

### Usage

```tsx
import { DeviceFrame } from '@/storybook/DeviceFrame';

<DeviceFrame>
  <YourScreenPreview />
</DeviceFrame>

// Dev only — hatch overlays for safe top/bottom:
<DeviceFrame showSafeArea>
  <YourScreenPreview />
</DeviceFrame>
```

| Prop | Default | Purpose |
|------|---------|---------|
| `children` | — | Rendered in content viewport (behind frame) |
| `showSafeArea` | `false` | Diagonal hatch guides for top 62px / bottom 34px |
| `scale` | `0.85` | Scales entire 450px-wide hardware asset |
| `label` | `402×874` | Figcaption under frame |

**Removed:** `showChrome` — chrome comes from the PNG only.

### Layer order (do not change without review)

1. `openui-device-frame__screen` — white background, clipped to screen radius  
2. `openui-device-frame__viewport` — story children (safe-area inset + horizontal layout margin padding)  
3. `openui-device-frame__hardware` — frame PNG in **document flow** (sizes the wrapper), `z-index: 2` on top  

The frame `<img>` must stay **in document flow** (`width: 100%`, `height: auto`). Do not set it `position: absolute` without an in-flow sizing element — the wrapper will collapse to zero height.

### Viewport padding (matches product)

From `src/styles/storybook.css`:

- `top`: `var(--device-safe-area-top)` (62px)  
- `bottom`: `var(--device-safe-area-bottom)` (34px)  
- `padding-inline`: `var(--layout-margin-horizontal)` (16px)  

Story content must behave as if it were inside `.openui-app-screen` + `.openui-app-content`.
Scrollable story content must not show desktop scrollbar chrome.

---

## Content restrictions (what goes where)

| Zone | Height / width | Allowed | Not allowed |
|------|----------------|---------|-------------|
| Safe top | 62px | Background bleed, decorative media | Buttons, inputs, titles, tappable rows |
| Safe bottom | 34px | Background bleed | Primary CTAs, tab bars, scroll indicators |
| Layout margin band | 16px inset L/R inside safe area | All primary UI | — |
| Center content | 370 × 778 pt max | Screens, forms, lists | — |
| Under Dynamic Island | Center top | Nothing critical | Nav titles, alerts, badges |
| Full-bleed horizontal | 402px wide | Hero images, maps | Text without side inset |

**Fixed footers / tab bars:** Sit **above** the bottom safe inset (34px), not underneath the home indicator.

**Large titles:** Start below the top safe inset (62px from screen top), not under the island.

---

## CSS cheat sheet

```css
/* Screen root — product */
.openui-app-screen { /* safe area only — global.css */ }

/* Variables */
width: var(--device-screen-width);             /* 402px */
min-height: var(--device-screen-height);       /* 874px */
padding-top: var(--device-safe-area-top);      /* 62px */
padding-bottom: var(--device-safe-area-bottom); /* 34px */

/* Content wrapper inside .openui-app-screen */
max-width: var(--device-screen-width);         /* 402px outer box */
padding-inline: var(--layout-margin-horizontal); /* 16px → 370px inner content */

/* On device — prefer max() with env() */
padding-top: max(var(--device-safe-area-top), env(safe-area-inset-top, 0px));
```

---

## Why 16px horizontal margins (not 24px)

Apple **system minimum layout margins** on iPhone portrait (compact width): **16pt** leading/trailing. HIG: position content relative to **safe area** and **layout margins** from UIKit.

Figma status bar components often use **24px** padding around clock/icons — that is **status chrome**, not app content margins. This DS uses **16px** for content (`--layout-margin-horizontal`).

---

## AI checklist

- [ ] Screen targets 402×874; no desktop-first layout  
- [ ] No primary UI in top **62px** or bottom **34px**  
- [ ] Content uses `--layout-margin-horizontal` (16px) inside safe area  
- [ ] Product shell: `.openui-app-screen` + `.openui-app-content` (or equivalent token padding)  
- [ ] Storybook previews use `<DeviceFrame>` — **no** extra status bar / island / home overlays  
- [ ] Scrollable mobile content hides visible scrollbars  
- [ ] Frame asset updated in `src/assets/devices/` if design changes  
- [ ] [LAYOUT-RULES.md](./LAYOUT-RULES.md) spacing tokens applied inside content area  
- [ ] `env(safe-area-inset-*)` considered for real-device builds  

---

## File map

| What | Where |
|------|--------|
| Device constants | `src/tokens/device/iphone.ts` |
| CSS variables | `src/tokens/layout.css` (`--device-*`, `--layout-*`) |
| Frame component | `src/storybook/DeviceFrame.tsx` |
| Frame styles | `src/styles/storybook.css` (`.openui-device-frame*`) |
| Frame PNG (bundled) | `src/assets/devices/iphone-17-pro-frame.png` |
| Frame PNG (static) | `public/devices/iphone-17-pro-frame.png` |
| Storybook config | `.storybook/main.ts` → `staticDirs: ['../public']` |
| App screen classes | `src/styles/global.css` → `.openui-app-screen`, `.openui-app-content` |
| Figma sync data | `src/tokens/data/ios-layout-figma.json` |
| Storybook | Foundational → Layout → Device, Layout zones, Patterns |

---

## Do not

- Design at 390×844 as the primary canvas  
- Hard-code notch height as 44px (pre–Dynamic Island)  
- Ignore bottom inset on fixed footers / tab bars  
- Recreate status bar icons with Lucide or custom SVG in app or Storybook  
- Add `DeviceStatusBar`, island pills, or home-bar overlays — use the frame PNG  
- Set frame `<img>` to `position: absolute` without in-flow height  
- Use **24px** screen margins for app content unless design system tokens change  
- Place `showChrome` or duplicate chrome layers (removed intentionally)  
- Use landscape as the default (portrait first)  
