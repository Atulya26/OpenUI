# Layout & spacing rules

**OpenUI** · class prefix `.openui-*`

Rules for humans and AI when building UI in this design system.  
References: [Apple HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout), [Material 3 Layout](https://m3.material.io/foundations/layout/layout-overview/overview).

**Navigation:** Start at [docs/README.md](./README.md) · **[DEVICE-RULES.md](./DEVICE-RULES.md)** (read first for safe areas & frame) · [COLOR](./COLOR-RULES.md) · [TYPOGRAPHY](./TYPOGRAPHY-RULES.md) · [ICON](./ICON-RULES.md) · [COMPONENT](./COMPONENT-RULES.md) · [PATTERN](./PATTERN-RULES.md)

**Target device:** iPhone Pro **402×874** — safe top **62px**, bottom **34px**, content margins **16px** horizontal.

---

## Hard rules (never break)

1. **No arbitrary spacing** — Do not use raw `px`, `rem`, or Tailwind-style `p-5`, `gap-[13px]` for layout. Use CSS variables:
   - Primitives: `--space-{0-10}` (Storybook / token docs only)
   - Product UI: `--layout-*` semantic tokens only

2. **4px grid only** — Allowed spacing values come from `src/tokens/primitives/spacing.ts`. If a value is not on the scale, add a token via design review — do not invent one in a component.

3. **Touch targets ≥ 44px** — Any tappable control must be at least `var(--layout-touch-target-min)` in both dimensions (or hit area expanded with padding).

4. **Mobile-first, one column default** — Screens use a single column with `var(--layout-inset-screen-x)`. Multi-column layouts only at `min-width: var(--layout-breakpoint-tablet)` and only when the pattern calls for it (e.g. card grid).

5. **No dashboard grids** — Do not add 12-column grids, wide data-table density, or desktop-only breakpoints. This DS targets mobile apps.

6. **Safe areas** — Top **62px**, bottom **34px** on iPhone Pro canvas. Combine with `env(safe-area-inset-*)` on device. Full spec: [DEVICE-RULES.md](./DEVICE-RULES.md). **Never** place critical actions under the home indicator or Dynamic Island.

7. **No visible scrollbars** — Scrolling is allowed, but mobile screen containers must hide scrollbar chrome. Do not show desktop-style scrollbars in `DeviceFrame` or product screens.

8. **Layout margins inside safe area** — **16px** horizontal (`--layout-margin-horizontal`) on iPhone. This is separate from safe area and separate from status-bar chrome padding in Figma (~24px).

9. **Semantic before primitive** — In components and screens, use `--layout-gap-stack-md`, not `--space-4`, even though they resolve to the same value.

10. **Typography + spacing** — Use existing `--text-*` tokens for type. Do not nudge vertical spacing to “fix” line height; pick the correct stack gap token instead.

11. **Three layers** — Always apply in order: **safe area** → **layout margins** → **content**. See [Region model](#region-model-safe-area--margins--content).

---

## Region model (safe area → margins → content)

```
┌────────────── 402px ──────────────┐
│ SAFE TOP 62px    (no content)      │
│ ┌─ margin 16px ─────────────────┐ │
│ │  CONTENT 370px wide            │ │
│ │  gap-stack-*, inset-container  │ │
│ └────────────────────────────────┘ │
│ SAFE BOTTOM 34px (no content)      │
└────────────────────────────────────┘
```

| Layer | CSS (product) | Purpose |
|-------|---------------|---------|
| Safe area | `.openui-app-screen` padding | Clears Dynamic Island, status bar, home indicator |
| Layout margins | `.openui-app-content` `padding-inline` | 16px side inset for readable content |
| Content rhythm | `--layout-gap-*` | Vertical/horizontal spacing between elements |

**Storybook:** `DeviceFrame` viewport applies the same safe-area inset and `padding-inline` as product. Chrome (island, status, home bar) is **only** in the frame PNG — see [DEVICE-RULES.md](./DEVICE-RULES.md#deviceframe-storybook-only).

---

## Token cheat sheet

| Need | Token | Value (iPhone) |
|------|--------|----------------|
| Layout margin (in safe area) | `--layout-margin-horizontal` | 16px |
| Screen side padding (alias) | `--layout-inset-screen-x` | 16px |
| App shell outer width | `--device-screen-width` | 402px |
| Content max width after margins | `--layout-content-width` | 370px |
| Device content width (alias) | `--device-content-width` | 370px |
| Safe top / bottom | `--device-safe-area-top` / `bottom` | 62px / 34px |
| Usable content height | `--device-content-height` | 778px |
| Card / sheet padding | `--layout-inset-container` | 16px |
| Icon + label | `--layout-gap-inline-sm` | 8px |
| Tight inline | `--layout-gap-inline-xs` | 4px |
| Related vertical items | `--layout-gap-stack-xs` … `lg` | 8–24px |
| Major sections | `--layout-gap-section` | 32px |
| Touch target min | `--layout-touch-target-min` | 44px |
| Tablet breakpoint | `--layout-breakpoint-tablet` | 600px |

---

## When to use which stack gap

| Gap | px | Use when |
|-----|-----|----------|
| `stack-xs` | 8 | Label → input, tightly related lines |
| `stack-sm` | 12 | Form fields, list items in a group |
| `stack-md` | 16 | Separate groups in the same section |
| `stack-lg` | 24 | Subsections with different topics |
| `section` | 32 | Major screen regions |
| `section-loose` | 40 | Rare; marketing / empty states |

Pick the **smallest** token that keeps clear separation. Do not default everything to `section`.

---

## Grid rules

- **Default:** `grid-template-columns: 1fr` within inset content area (370px wide on phone).
- **Two columns:** Only for card/media grids at `≥ --layout-breakpoint-tablet`.
- **Gap between cells:** `--layout-gap-stack-md` unless cards are dense (then `stack-sm`).
- **Alignment:** Start-aligned text; full-width inputs and primary buttons.

---

## Padding restrictions summary

| Context | Horizontal | Vertical (top/bottom) |
|---------|------------|------------------------|
| App screen (product) | 16px via `.openui-app-content`; content resolves to 370px | Safe area via `.openui-app-screen` |
| Storybook `DeviceFrame` viewport | 16px (`--layout-margin-horizontal`) | 62px top + 34px bottom inset |
| Card interior | `--layout-inset-container` (16px) | Per pattern |
| Full-bleed image | 0 (edge to edge) | May extend into safe area; text does not |

---

## AI follow-up checklist (every layout change)

- [ ] Read [DEVICE-RULES.md](./DEVICE-RULES.md) if the change touches screen edges or Storybook frame  
- [ ] All spacing uses `--layout-*` (semantic preferred over `--space-*`)  
- [ ] No new magic numbers in CSS/inline styles  
- [ ] Tap targets meet 44px minimum  
- [ ] Mobile screen scrollbars are hidden  
- [ ] Content respects safe top 62px / bottom 34px  
- [ ] Horizontal inset is 16px (`--layout-inset-screen-x`), not 24px  
- [ ] Column count is 1 on phone unless story explicitly needs 2-col  
- [ ] Section breaks use `gap-section`, not oversized stack gaps  
- [ ] Colors and type still use `--color-*` and `--text-*` tokens  
- [ ] Storybook layout stories updated if tokens changed  
- [ ] No duplicate device chrome overlays in `DeviceFrame`  

---

## Allowed exceptions (require comment in PR)

- **1px borders** — use `--color-stroke-*`, not spacing scale  
- **Icon optical alignment** — max ±2px adjust on icon-only buttons; document why  
- **Third-party embeds** — maps, video players may ignore inset; wrap in a container with inset  

---

## File map

| What | Where |
|------|--------|
| Primitive scale | `src/tokens/primitives/spacing.ts` |
| Semantic roles | `src/tokens/semantic/layout.ts` |
| Resolved values | `src/tokens/layout.ts` |
| CSS variables | `src/tokens/layout.css` |
| Device + safe area | `src/tokens/device/iphone.ts` |
| App screen shell | `src/styles/global.css` |
| Storybook frame | `src/storybook/DeviceFrame.tsx`, `src/styles/storybook.css` |
| Storybook | Foundational → Layout |
| Master index | [docs/README.md](./README.md) |
| Agent entry | [AGENTS.md](../AGENTS.md) |

---

## Do not

- Copy Material Design web layout patterns verbatim (dense tables, persistent side nav)  
- Use `margin: auto` hacks instead of inset tokens for page padding  
- Mix spacing systems (Bootstrap, Tailwind defaults) in the same codebase  
- Add `spacing={number}` props without mapping to semantic tokens  
- Put tappable UI in the top 62px or bottom 34px safe zones  
- Use 24px horizontal margins for screen content (status bar padding ≠ layout margin)  
- Layer status bar / home indicator on top of `DeviceFrame` — use the frame PNG  
