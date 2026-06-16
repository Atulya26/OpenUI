# OpenUI Visual Upliftment Plan

Audit date: 2026-06-10 · Scope: `src/tokens/`, `src/components/`, `src/styles/`, `docs/*.md`

---

## 1. Audit verdict

The foundation layer is genuinely strong — better than most v0.1 systems. Full primitive→semantic token pipeline (color, type, spacing, radius, shadow, elevation, motion, z-index), near-zero hardcoded values in component CSS (one `env()` exception in Sheet), `prefers-reduced-motion` handled at the token level, 44px touch targets enforced, and 17 well-structured rule docs.

The "immature / unpolished" feeling does **not** come from missing tokens. It comes from six specific gaps:

| # | Gap | Why it reads as unpolished |
|---|-----|---------------------------|
| 1 | **Dark mode is half-built** — colors flip, shadows/focus rings don't | Hardcoded light hex inside shadow tokens (`#ffffff`, `#f5f5f5`, `#ebebeb`, `#242628` in `shadows.css`) makes every elevated surface and focus state look broken in dark theme |
| 2 | **Touch feedback is scale-only** — `:active` just shrinks 1.5% | Premium mobile UIs darken/tint the surface on press (state layers). Scale alone feels weightless; hover styles exist but never fire on touch |
| 3 | **Enter-only motion** — every keyframe is `*-in`; nothing animates out | Sheets, toasts, select menus vanish abruptly. Exit choreography is the single biggest "feels cheap" signal on mobile |
| 4 | **Sizing built from gap tokens** — `--layout-gap-section` as Switch track height, `--layout-gap-stack-md` as badge width, `calc(--layout-gap-inline-xs / 2)` paddings | Produces off-grid 2px values, accidental coupling (change a gap, break a Switch), and arbitrary-looking proportions |
| 5 | **No translucency / hairlines** — opaque 1px-bordered bars everywhere | iOS-adjacent systems read "native" through backdrop blur on bars and 0.5px hairline separators. OpenUI's 1px `stroke-soft200` borders on TabBar/NavigationBar read "web" |
| 6 | **Loading & empty states don't exist** — no Skeleton, Spinner, ProgressBar, EmptyState | Any real screen built with the kit hits a visual cliff the moment data loads |

Plus smaller polish defects catalogued in §3.

---

## 2. What is already good (do not touch)

- Token architecture: `src/tokens/primitives/` → `src/tokens/semantic/` → generated CSS. Keep this pipeline as-is.
- Typography ramp: HIG-matched sizes/leading/tracking for Inter + Inter Display (`primitives/typography.ts`). Correct optical-size split at 20px.
- Color system: 11-scale neutral + 10 hue palettes, semantic bg/text/stroke/icon/state roles with a real dark theme map (`tokens.css`).
- Motion vocabulary: duration/easing primitives + semantic roles + transition contracts (`motion.css`). This is ahead of most production systems — it's just underused.
- Guardrails script (`scripts/check-guardrails.mjs`) and docs discipline (`docs/README.md` index → per-area rules).
- Component CSS hygiene: BEM-ish `.openui-*`, variants via modifiers, a11y states (`focus-visible`, `aria-disabled`).

---

## 3. Detailed findings

### 3.1 Color & theming

- **F1 — Dark-mode shadows broken.** `src/tokens/shadows.css` defines all shadows only in `:root` with baked light-mode hex: `--shadow-component-button-primary-focus: ... 0px 0px 0px 2px #ffffff`, `--shadow-custom-x-small: ... 0px 0px 0px 1px #f5f5f5`, `--shadow-component-fancy-button-stroke: 0px 0px 0px 1px #ebebeb ...`, tooltip ring `#ebebeb`. In `[data-theme='dark']` these render light halos around every button, card, and input.
- **F2 — Focus ring assumes white canvas.** The 2px inner ring of every focus shadow is hardcoded white; breaks on `bg-weak50` canvas edges and fully in dark mode.
- **F3 — No neutral state-layer alphas.** Only `--color-primary-alpha10/16` exist. There is no token for "pressed neutral surface" — which is why components fall back to scale-only press feedback (F5).
- **F4 — Duplicate width tokens.** `--layout-content-width: 370px` and `--device-content-width: 370px` coexist in `layout.css`; one should alias the other.

### 3.2 Interaction states (the biggest perceived-quality lever)

- **F5 — No pressed state layer.** Every `:active` is `transform: scale(0.985)` only (Button, Card, ListRow, Switch, TabBar, SegmentedControl, Input action). No background shift on press anywhere.
- **F6 — Hover-first styling on a touch-first system.** Hover states are richer than pressed states (e.g. Button fill hover changes bg; press doesn't). On a phone the user never sees the richer state.
- **F7 — TabBar selected state over-designed.** Filled primary pill + `translateY(-4px)` lift + fancy-button shadow + inverted badge. The translateY shifts layout on every tab change and fights the "quiet, restrained elevation" principle in `docs/VISUAL-LANGUAGE.md`. Compare: iOS tab bars change tint only.
- **F8 — ListRow selected paints its divider primary** (`border-bottom-color: var(--color-primary-base)`) — reads as a rendering glitch, not a state.

### 3.3 Motion

- **F9 — No exit animations.** `grep keyframes src/components` → only `*-in` keyframes (Sheet ×2, Toast ×2, Select ×1, Button spinner). `--motion-duration-exit` / `--motion-ease-exit` tokens exist but are referenced nowhere.
- **F10 — No spring on overlay enter.** `--motion-ease-spring-soft` defined, never used. Sheet entrance uses `emphasized-decelerate` — fine but flat; bottom sheets are the canonical spring moment.
- **F11 — No shared micro-interactions.** No checkmark draw on Checkbox, no thumb squish on Switch, no count-change animation on Badge, no skeleton shimmer (no skeleton at all). Each would use existing tokens.

### 3.4 Sizing & geometry

- **F12 — Gap tokens used as dimensions.** Switch: track `height: var(--layout-gap-section)` (32px), thumb `width: var(--layout-gap-stack-lg)` (24px), checked offset `calc(var(--layout-inset-container) + var(--layout-gap-inline-xs))`. TabBar: badge `min-width/height: var(--layout-gap-stack-md)`, icon-wrap `min-height: var(--layout-gap-stack-md)`. Semantically wrong and fragile.
- **F13 — Off-grid fractional calcs.** `calc(var(--layout-gap-inline-xs) / 2)` (= 2px) appears in SegmentedControl and TabBar paddings/gaps. The 4px grid needs an explicit 2px primitive (`--space-half`) instead of division.
- **F14 — Nested radius mismatch.** SegmentedControl: outer `--radius-control` (10px) with 2px padding → inner should be 8px (`--radius-md`); items use `--radius-sm` (6px). Corners visibly don't concentrically align.
- **F15 — Button `xl` is not a size.** `--xl` uses `--control-height-lg` (same 56px as `lg`) + full width. Either give it a real height step or rename to a `prominence`/layout prop.
- **F16 — Compact density violates touch targets** (sm 36px / md 40px), acknowledged in a code comment as unsafe until "Phase 2 expanded hit-area" — that hit-area work isn't scheduled anywhere. Schedule it (see Phase 2).

### 3.5 Surface character (the "native feel" gap)

- **F17 — No translucent bars.** TabBar and NavigationBar are opaque `bg-weak50`/`bg-white0` with 1px borders. The checklist (`docs/COMPONENT-CHECKLIST.md` → Foundations) already lists "Opacity / blur (glass)" as not started. `backdrop-filter: blur + saturate` on bars is the highest-impact single change for native feel.
- **F18 — No hairline separators.** All dividers are `--layout-border-width: 1px`. iOS uses 0.5px hairlines on 2x/3x displays. Add `--layout-border-hairline` with a `min-resolution` media query.
- **F19 — Shadow ramp is desktop-grade.** `--shadow-card-large` is a 7-layer stack; at mobile sizes multi-layer 20px-blur shadows read muddy. Mobile cards want tighter, lower shadows.

### 3.6 Typography & font delivery

- **F20 — Google Fonts `@import` in `src/styles/global.css`.** Render-blocking, FOUT on every load, and a hard external dependency for a published npm package. Self-host woff2 (variable) with `font-display: swap` + preload guidance.
- **F21 — No font-feature tokens.** `font-variant-numeric: tabular-nums` is applied ad hoc (TabBar badge) only. Add a `--text-numeric-tabular` utility/token and apply to Badge, trailing values in ListRow, Toast countdowns. Consider Inter features (`cv11` open digits) as an opt-in.
- **F22 — Title weights all-regular.** `title1/2/3` are weight 400 per HIG, but the kit has no emphasized title variant; product screens almost always need semibold titles. Add `--text-title*-emphasized-*` weight aliases (HIG supports emphasized variants).

### 3.7 Component coverage (visual-maturity blockers only)

From `docs/COMPONENT-CHECKLIST.md` — items whose absence directly caps visual quality of any screen built with the kit: Skeleton, Spinner/ActivityIndicator, ProgressBar, EmptyState, Dialog/Alert, ActionSheet, Slider, PageIndicator, pull-to-refresh affordance. (Full checklist remains the backlog source of truth; these are the visual-floor subset.)

### 3.8 Codebase / docs structure

- **F23 — Story-only CSS shipped in the library.** `TabBar.css` carries ~150 lines of `.openui-tab-bar-story-*` classes (grids, phone mock, cards). Same pattern risk elsewhere. Story CSS belongs in `src/stories/` or `src/styles/storybook.css`, not in `dist/styles.css`.
- **F24 — No visual regression safety net.** Storybook 10 + a11y addon exist, but no Chromatic/test-runner snapshots, so polish work has no protection against regressions.
- **F25 — Docs drift risk.** Rules docs are excellent but hand-maintained; nothing verifies docs ↔ token parity (e.g. radius doc vs `radius.css`). Extend `check-guardrails.mjs`.
- **F26 — `docs/superpowers/` contains only `.DS_Store`** — dead directory; remove or populate.

---

## 4. Upliftment plan

Phased so each phase ships visible quality and later phases build on new tokens. Effort: S < ½ day · M ≈ 1 day · L ≈ 2–3 days.

### Phase 1 — Fix the foundation lies (theming + state layers) — ~1 week

The system must not look broken before it can look polished.

| Step | Change | Files | Effort |
|------|--------|-------|--------|
| 1.1 | **Tokenize shadow ring colors.** Replace every baked hex in shadows with theme-aware vars: `--shadow-ring-canvas` (white0), `--shadow-ring-stroke` (stroke-soft200), `--shadow-ring-neutral-ink`. Add a `[data-theme='dark']` block to `shadows.css` with recalibrated opacities (dark mode: stronger key shadow, no light rings; rely on surface tint per Material dark guidance) | `src/tokens/primitives/shadows.ts`, `semantic/shadows.ts`, `shadows.css` | L |
| 1.2 | **Theme-safe focus ring.** Inner ring → `var(--color-bg-white0)`; outer halo → `color-mix(in srgb, var(--color-primary-base) 12%, transparent)`. One treatment, works on any surface, both themes | `shadows.css`, all `:focus-visible` rules | M |
| 1.3 | **Add state-layer alpha tokens.** `--state-layer-pressed-neutral` (ink 8–10%), `--state-layer-pressed-primary`, `--state-layer-pressed-on-fill` (white 12%), `--state-layer-selected` (alias existing primary-alpha10). Define light+dark | `tokens.css`, `primitives/alpha.ts`, `semantic/refs.ts` | M |
| 1.4 | **Apply pressed state layers everywhere.** Pattern: `:active` = scale (keep) **+ background shift** via state-layer token. Filled buttons darken one step on press (move current hover behavior to `:active`; keep hover as a pointer-only enhancement via `@media (hover: hover)`) | Button, IconButton, Card, ListRow, Chip, SegmentedControl, TabBar, Select, Input action CSS | L |
| 1.5 | **Gate all hover rules** behind `@media (hover: hover)` so sticky-hover never appears on touch | all component CSS | S |
| 1.6 | Merge `--layout-content-width` ↔ `--device-content-width` (keep device-, alias layout-) | `layout.css`, `semantic/layout.ts` | S |

Acceptance: Storybook in dark theme shows zero light halos; every interactive component visibly responds to press on an iPhone simulator without a mouse.

### Phase 2 — Geometry & sizing honesty — ~1 week

| Step | Change | Files | Effort |
|------|--------|-------|--------|
| 2.1 | **Add `--space-half: 2px`** primitive; replace all `calc(... / 2)` | `layout.css`, `primitives/spacing.ts`, SegmentedControl, TabBar | S |
| 2.2 | **Component size tokens.** Add per-component dimension vars defined from real numbers, scoped at component root: e.g. `.openui-switch { --switch-track-w: 52px; --switch-track-h: 32px; --switch-thumb: 24px; --switch-travel: calc(...) }`. Kill every gap-token-as-dimension (F12). Same for TabBar badge, icon-wrap, Sheet handle | Switch, TabBar, Sheet, Badge CSS | L |
| 2.3 | **Concentric radius rule.** Document `inner = outer − inset` in `docs/RADIUS-RULES.md`; fix SegmentedControl (items → `--radius-md`), audit Chip-in-Card, Button-in-Sheet-footer | `RADIUS-RULES.md`, SegmentedControl.css | S |
| 2.4 | **Button size ramp.** Give `xl` a real height (e.g. 60px token `--control-height-xl`) or replace with `prominence="hero"`; decide and document in `SIZING-RULES.md` | Button, `layout.css`, docs | M |
| 2.5 | **Expanded hit-area utility** (pseudo-element `::after` inset −4/−8px) so compact density stops violating 44px; unblocks the code-comment debt in `layout.css` | new `src/styles/hit-area.css` or mixin pattern, Switch/Checkbox/Radio/IconButton | M |
| 2.6 | **Hairline borders.** `--layout-border-hairline: 0.5px` under `min-resolution: 2dppx` (1px fallback); apply to ListRow dividers, Separator, bar borders | `layout.css`, ListRow, Separator, TabBar, NavigationBar | M |

Acceptance: zero `calc(--layout-gap-* / 2)` and zero gap-tokens-as-width/height in `src/components/` (add a guardrail grep for both).

### Phase 3 — Motion: exits, springs, micro-interactions — ~1.5 weeks

| Step | Change | Files | Effort |
|------|--------|-------|--------|
| 3.1 | **Exit choreography.** Add `data-state="closing"` (or class) driven exit animations using existing `--motion-duration-exit` + `--motion-ease-exit`: Sheet panel slides down + scrim fades; Toast slides/fades out; Select menu scales out. Requires small TSX changes to delay unmount until `animationend` | Sheet, Toast, Select (css + tsx) | L |
| 3.2 | **Spring sheet entrance.** Sheet panel enter → `--motion-ease-spring-soft` at `--motion-duration-expressive`; scrim keeps current fade | Sheet.css | S |
| 3.3 | **Micro-interactions** (all from existing tokens): Switch thumb stretch on press (width +2px, `feedback` duration); Checkbox check-path draw (`stroke-dashoffset`, `state` duration); SegmentedControl — animate selection as a sliding thumb (single moving indicator, not per-item bg swap); TabBar icon settle (scale 0.92→1 on select, `enter` duration) | Switch, Checkbox, SegmentedControl, TabBar | L |
| 3.4 | **Toast stacking behavior** — translate/scale older toasts back rather than plain list | Toast | M |
| 3.5 | Verify all new animation respects the reduced-motion zeroing in `motion.css` (it will if only tokens are used — add to component checklist) | `COMPONENT-CHECKLIST.md` | S |

Acceptance: nothing in Storybook disappears without an exit; Sheet/SegmentedControl/Switch feel "springy" in a 60fps screen recording.

### Phase 4 — Native surface character — ~1 week

| Step | Change | Files | Effort |
|------|--------|-------|--------|
| 4.1 | **Glass tokens.** `--surface-glass-bg` (`color-mix` white0 72% over transparent), `--surface-glass-blur: blur(20px) saturate(1.8)`, dark variant; `@supports (backdrop-filter: ...)` with opaque fallback | new `src/tokens/surfaces.css` (+ ts primitives) | M |
| 4.2 | Apply glass to **TabBar** (fixed variant) and **NavigationBar** (scrolled-under state); replace 1px borders with top/bottom hairlines | TabBar, NavigationBar | M |
| 4.3 | **Calm the TabBar selected state**: drop `translateY` lift and fancy shadow; selected = primary icon/label tint + optional soft `--state-layer-selected` pill. Aligns with `VISUAL-LANGUAGE.md` "quietest surface that works" | TabBar.css | S |
| 4.4 | **Mobile shadow recalibration.** Add `--shadow-surface-card-mobile` (2-layer, ≤8px blur, y ≤ 2px) and make `--shadow-surface-card` alias it; keep large ramp for overlays only. Fix ListRow selected divider (F8) → keep divider `stroke-soft200`, selection shown by bg + leading accent if needed | `shadows.css`, Card, ListRow | M |
| 4.5 | **Scrim token** — promote Sheet's inline `color-mix` 48% black to `--color-overlay-scrim` (light/dark aware) | `tokens.css`, Sheet.css | S |

Acceptance: side-by-side Storybook device frame vs. iOS Settings/App Store screenshot — bars, dividers, and cards sit in the same perceived quality class.

### Phase 5 — Typography & loading-state floor — ~1 week

| Step | Change | Files | Effort |
|------|--------|-------|--------|
| 5.1 | Self-host Inter + Inter Display variable woff2 in `src/assets/fonts/`, `@font-face` with `font-display: swap`; remove the Google `@import`; document preload snippet in README | `global.css`, assets, README | M |
| 5.2 | Emphasized title variants (`--text-title*-emphasized-font-weight: 600/700`) + `Text` prop `emphasized` | `typography.css`, `primitives/typography.ts`, Text.tsx | S |
| 5.3 | Tabular numerals token + apply (Badge, ListRow trailing text, Toast) | `typography.css`, components | S |
| 5.4 | **Skeleton** (shimmer via `--motion-duration-loading`), **Spinner** (extract Button spinner into shared component), **ProgressBar**, **EmptyState** (icon + title + body + action slot) — the visual-floor four from §3.7 | new components + stories | L |
| 5.5 | Dialog/Alert + ActionSheet (reuse Sheet scrim/motion contracts) | new components | L |

### Phase 6 — Guardrails so polish sticks — ~3 days

| Step | Change | Files | Effort |
|------|--------|-------|--------|
| 6.1 | Extend `check-guardrails.mjs`: forbid raw hex in `src/components/**/*.css`; forbid `calc(var(--layout-gap` divisions; forbid gap tokens in `width/height/min-*`; require `@media (hover: hover)` around `:hover`; require an exit animation wherever an enter `keyframes *-in` exists | `scripts/check-guardrails.mjs` | M |
| 6.2 | Visual regression: Storybook test-runner or Chromatic on light+dark × default+compact for every story | `.storybook/`, CI | M |
| 6.3 | Move all `*-story-*` CSS out of component files into `src/stories/` (F23); add guardrail forbidding `story` substring in `src/components/**/*.css` | TabBar.css et al. | S |
| 6.4 | Docs sync: update `SHADOW-RULES`, `MOTION-RULES`, `SIZING-RULES`, `VISUAL-LANGUAGE`, `COMPONENT-CHECKLIST` for every token added above; delete `docs/superpowers/`; add a "state layers" section to `COLOR-RULES.md` | docs | M |

---

## 5. Sequencing & dependencies

```
Phase 1 (theming + state layers)  ──► Phase 3 (motion uses state layers)
Phase 2 (sizing tokens)           ──► Phase 4 (glass bars need hairlines/sizes)
Phase 4 & 5 independent after 1–2 ──► Phase 6 last (locks everything in)
```

Total: ~6 working weeks solo. If only one week exists, do **Phase 1 + steps 3.1, 4.3, 6.1** — broken dark mode, dead-feeling press states, missing exits, and the over-loud TabBar are the four things a reviewer notices in the first minute.

## 6. Definition of "uplifted"

1. Dark theme is screenshot-indistinguishable in quality from light theme (no light halos, recalibrated elevation).
2. Every interactive component has four visually distinct, token-driven states on touch: rest, pressed, selected, disabled.
3. Every entering surface exits with paired motion; overlays spring.
4. No dimension in component CSS derives from a gap token or fractional calc.
5. Bars are translucent with hairline edges inside the device frame.
6. A screen composed of Card + ListRow + TabBar + Sheet passes the "could ship in an App Store screenshot" eyeball test against iOS Settings.
7. Guardrails + visual regression prevent backsliding.
