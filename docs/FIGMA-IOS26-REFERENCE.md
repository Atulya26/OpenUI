# Figma reference — iOS & iPadOS 26 UI Kit

Source file for spacing, safe areas, and layout guides used by this design system.

---

## Primary link (team)

**Layout / safe area node (dev mode):**  
https://www.figma.com/design/du4UrXNeeELPb3KqtdwWJQ/iOS-and-iPadOS-26--Community-?node-id=754-62878&m=dev

- **File key:** `du4UrXNeeELPb3KqtdwWJQ`
- **Node id:** `754:62878`

Duplicate this file to your team space if MCP/agents cannot read the community original.

---

## Official Apple kit (community)

https://www.figma.com/community/file/1527721578857867021/ios-and-ipados-26

Published with [Apple’s iOS and iPadOS 26 design kits announcement](https://developer.apple.com/news/?id=pnfbj8je) (July 2025). Contains layout guides, safe areas, updated control sizes, corner radii, and Liquid Glass components.

---

## What to extract from node `754:62878`

When Figma access works, sync these into `src/tokens/device/iphone.ts` and `src/tokens/semantic/layout.ts`:

| Figma layer / spec | DS location |
|------------------|-------------|
| iPhone frame width × height | `iphoneProTarget.screenWidth/Height` |
| Safe area top / bottom / sides | `iphoneSafeArea`, `--device-safe-area-*` |
| Layout margins (inside safe area) | `layoutMargin`, `--layout-margin-*` |
| Dynamic Island bounds | `iphoneDynamicIsland` |
| Toolbar / tab bar height | `layoutChrome.*` (add when confirmed) |
| Standard content width | `layoutFixed.maxContentWidth` |
| Corner radius (display / concentric) | `iphoneFrameAsset.screenCornerRadius` |
| Hardware frame PNG (bezels + chrome) | `src/assets/devices/iphone-17-pro-frame.png` |

Record exact px values in `src/tokens/data/ios-layout-figma.json` after each sync.

### Storybook hardware frame

When exporting or updating the device mockup from Figma:

1. Export **450×920** RGBA with transparent screen center.  
2. Include **Dynamic Island, status bar, and home indicator** in the PNG (baked chrome).  
3. Replace `src/assets/devices/iphone-17-pro-frame.png` and `public/devices/iphone-17-pro-frame.png`.  
4. Do **not** add separate status-bar or home-bar layers in `DeviceFrame` — see [DEVICE-RULES.md](./DEVICE-RULES.md).

---

## iOS 26 layout model (Apple)

Three nested regions — **do not skip layers**:

```
┌─ Screen (402×874) ─────────────────────┐
│  Safe area (system — not for content)   │
│  ┌─ Layout margins ─────────────────┐  │
│  │  Interactive / important content │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

1. **Safe area** — avoids Dynamic Island, status bar, home indicator, floating chrome ([HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout), [WWDC25 “Make your UIKit app more flexible”](https://developer.apple.com/videos/play/wwdc2025/282/)).
2. **Layout margins** — consistent inset *inside* safe area (like `layoutMargins` / `layoutGuide(for: .margins)`).
3. **Content** — typography, components, spacing tokens (`--layout-gap-*`).

Backgrounds (images, color washes) may extend **outside** safe area; **controls and text may not**.

---

## Current DS values (until Figma sync)

Aligned with iPhone 16/17 Pro @ 402×874 and Apple kit structure:

| Region | Value |
|--------|-------|
| Screen | 402 × 874 pt |
| Safe top | 62 pt |
| Safe bottom | 34 pt |
| Layout margin H | **16 pt** (`--layout-margin-horizontal`) — HIG/UIKit, not Figma status bar padding |
| Content width | **370 pt** (402 − 32) |

**After Figma sync:** diff this table and update tokens + [DEVICE-RULES.md](./DEVICE-RULES.md).

**Important:** Figma status bar frames often show **24px** side padding for the clock/icons. That is **not** the same as UIKit **layout margins** for app content (16pt on iPhone). Keep content at 16px unless Apple changes system minimums.

---

## Agent workflow

1. Read [DEVICE-RULES.md](./DEVICE-RULES.md) + [LAYOUT-RULES.md](./LAYOUT-RULES.md)
2. If changing layout numbers, open Figma node `754:62878` first
3. Update `ios-layout-figma.json` + TS tokens + Storybook **Layout → Layout zones**
4. Never place tappable UI in safe-area zones

---

## MCP access issues

If `get_design_context` fails:

- Confirm Figma login (`whoami` in Figma MCP)
- Duplicate file into a team project the agent can read
- Paste a screenshot or export spec table into this doc manually
