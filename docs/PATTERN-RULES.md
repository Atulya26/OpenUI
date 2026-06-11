# Pattern rules

Rules for humans and AI when building **composite mobile UI**: screens, flows, and layouts made from tokens + components.  
Patterns are not new tokens — they are **recipes** that combine foundational rules.

**Read before building screens:**  
[docs/README.md](./README.md) → [DEVICE](./DEVICE-RULES.md) → [LAYOUT](./LAYOUT-RULES.md) → [COLOR](./COLOR-RULES.md) → [TYPOGRAPHY](./TYPOGRAPHY-RULES.md) → [ICON](./ICON-RULES.md) → [COMPONENT](./COMPONENT-RULES.md)

---

## Hard rules (never break)

1. **Compose from DS** — Screens use DS components and CSS variables. No one-off screen CSS files with hundreds of magic numbers.

2. **Screen shell** — Product: `.openui-app-screen` + `.openui-app-content`. Every screen: horizontal `var(--layout-inset-screen-x)` (16px), respect safe areas (62px top / 34px bottom), default single column. Storybook: wrap previews in `<DeviceFrame>` — see [DEVICE-RULES.md](./DEVICE-RULES.md).

3. **Hierarchy** — One bold `screenTitle` / `largeTitle` per screen. Sections use `sectionTitle`. Body uses `body` / `secondary`.

4. **Consistent spacing** — Section breaks: `gap-section`. Form fields: `gap-stack-sm`. Do not invent per-screen spacing.

5. **State feedback** — Errors/success/warning use `state-*` color tokens, not custom reds/greens.

6. **Icons + labels** — Primary actions have visible text or `label` on icon-only controls. Tab bars: icon + `caption1` label.

7. **No dashboard patterns** — No persistent side nav, dense data grids, or multi-panel desktop layouts.

---

## Pattern recipes

### Screen scaffold (402×874)

```
┌────────────── 402pt wide ──────────────┐
│ ░ safe top 62pt (Dynamic Island) ░░░░░ │
│ ┌── inset-screen-x (16pt) ───────────┐ │
│ │  largeTitle / screenTitle          │ │
│ │  [gap-section]                     │ │
│ │  section content…                  │ │
│ └────────────────────────────────────┘ │
│ ░ safe bottom 34pt (home indicator) ░░ │
└────────────────────────────────────────┘
```

See [DEVICE-RULES.md](./DEVICE-RULES.md).

**Storybook preview:**

```tsx
<DeviceFrame>
  <div className="openui-app-content">{/* or equivalent token padding */}</div>
</DeviceFrame>
```

- Use `showSafeArea` only when verifying inset boundaries (dev hatch overlay).  
- Do **not** add status bar, island, or home bar — they are in the frame PNG.  
- Background: `var(--color-bg-weak50)`  
- Content cards: `bg-white0`, `inset-container`, `stroke-soft200`  

### Form stack

| Element | Token / style |
|---------|----------------|
| Field label | `footnote` / `label` role |
| Input text | `body` |
| Label → field | `gap-inline-xs` |
| Field → field | `gap-stack-sm` |
| Submit button | `headline` + min touch target |
| Section above form | `gap-section` |

See Storybook → Foundational → Layout → **Form stack**.

### List row

| Element | Token / style |
|---------|----------------|
| Primary line | `listTitle` / `headline` |
| Secondary line | `secondary` / `subheadline` |
| Leading icon | `Icon` `md` `strong` |
| Trailing chevron | `Icon` `md` `soft` |
| Row padding | vertical `gap-stack-sm`, no extra horizontal padding when already inside a card/container |
| Icon/text gap | `gap-inline-md` |
| Separator | `stroke-soft200` border-bottom |

### Toolbar / nav bar

| Element | Token / style |
|---------|----------------|
| Height | ≥ touch target (44px) |
| Icons | `lg` or `md` |
| Title | `headline` centered or leading |
| Background | `bg-white0` + bottom border `stroke-soft200` |

### Collapsing large-title screen

Use `Screen` as the scroll owner and pass the navigation region through
`navigation`. The screen updates `--nav-collapse` from `0 → 1` and sets
`data-scrolled` when content moves under the sticky header.

```tsx
<Screen
  navigation={<NavigationBar title="Explore" size="large" collapsible />}
>
  {/* scrollable screen content */}
</Screen>
```

The sticky header owns the scrolled-under glass surface. `NavigationBar` keeps
side actions stable and crossfades the large title into the compact centered
title; product screens should not attach their own one-off scroll listeners for
this behavior.

### Empty state

| Element | Token / style |
|---------|----------------|
| Icon | `lg`, `soft` or `primary` |
| Title | `title3` |
| Message | `body` or `secondary`, `text-sub600` |
| CTA | primary button pattern |
| Block gap | `gap-stack-md` |

### Alert / banner

| Element | Token / style |
|---------|----------------|
| Background | `state-{type}-lighter` |
| Text | `state-{type}-dark` or `strong` |
| Icon | `state-{type}-base` |
| Padding | `inset-container` |

---

## AI follow-up checklist (every screen / pattern)

- [ ] Read foundational rule files for all tokens used  
- [ ] Read [DEVICE-RULES.md](./DEVICE-RULES.md) for safe areas and frame  
- [ ] Screen uses `layout-inset-screen-x` (16px) inside safe area  
- [ ] No primary UI in top 62px / bottom 34px  
- [ ] Storybook preview uses `DeviceFrame` without extra chrome layers  
- [ ] One clear title level per screen  
- [ ] Primary screen title is visually bold  
- [ ] Spacing from layout semantic tokens only  
- [ ] Colors from semantic `--color-*` only  
- [ ] Interactive elements meet 44px touch target  
- [ ] Mobile scroll containers hide visible scrollbars  
- [ ] Light + dark theme checked  
- [ ] Icon-only actions have accessibility labels  

---

## When to add a new “pattern” doc

If a product flow repeats (e.g. onboarding carousel, settings group):

1. Document the recipe in this file or a short `docs/patterns/{name}.md`  
2. Add a Storybook example under `Patterns/` (when folder exists)  
3. Do **not** add new tokens unless the repetition proves a gap  

---

## Do not

- Build screens entirely with inline styles  
- Mix web landing-page typography (64px heroes)  
- Use horizontal scroll for primary navigation on phone  
- Hard-code `#F5F5F5` page grays — use `bg-weak50`  
- Skip safe area on full-bleed layouts (for text/controls; media may bleed)  
- Add status bar / home indicator overlays in Storybook  

---

## File map

| What | Where |
|------|--------|
| Layout examples | Storybook → Foundational → Layout → Patterns |
| Device frame | `src/storybook/DeviceFrame.tsx`, [DEVICE-RULES.md](./DEVICE-RULES.md) |
| App shell | `src/styles/global.css` (`.openui-app-screen`, `.openui-app-content`) |
| Components | `src/components/` |
| Master index | [docs/README.md](./README.md) |
