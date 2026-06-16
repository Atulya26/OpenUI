# OpenUI Upliftment Plan 2 — Visual Alignment, Guardrails & Component Roadmap

Re-audit date: 2026-06-10 · Follows: `plan.md` (Phases 1–6) · Scope: `src/`, `scripts/`, `.storybook/`, `docs/`

---

## 1. Re-audit summary — Phase 1–6 verification

All six phases from `plan.md` landed (commits `dfce1f7` → `f083870`). Verified in code:

| Area | Status | Evidence |
|------|--------|----------|
| Dark-mode shadows + ring tokens | ✅ | `shadows.css` has `--shadow-ring-*` via `color-mix` + full `[data-theme='dark']` block at L167 |
| State layers | ✅ | `--color-state-layer-pressed-{neutral,primary,on-fill,danger}` + `selected`, light & dark |
| Hover gating | ✅ | `@media (hover: hover)` in 18 component files; guardrail enforces it |
| Exit animations | ✅ | Paired `*-out` keyframes (Sheet, Toast, Select…); guardrail enforces enter→exit pairing |
| Spring sheet | ✅ | Sheet panel enters with `--motion-ease-expressive` / `--motion-duration-expressive` |
| Sizing honesty | ✅ | `--space-half`, component dimension vars (`--switch-track-w` etc.), `--control-height-xl: 60px`, gap-as-dimension guardrail |
| Hairlines + glass | ✅ | `--layout-border-hairline` (0.5px @2dppx), `surfaces.css` glass tokens on TabBar fixed + NavBar scrolled-under |
| TabBar calmed | ✅ | Selected = tinted pill (`--color-state-layer-selected`), no translateY, no fancy shadow |
| Fonts self-hosted | ✅ | `src/assets/fonts/*.woff2`, `font-display: swap`, Google `@import` removed |
| Emphasized titles + tabular nums | ✅ | `--text-title*-emphasized-font-weight`, `--text-numeric-tabular` |
| Loading floor | ✅ | Skeleton, Spinner, ProgressBar, EmptyState, Dialog, ActionSheet shipped |
| Guardrails + visual matrix | ✅ | hex ban in shadows, story-CSS ban, hover gate, exit pairing, gap-dimension ban, test-runner `visualMatrix` light/dark × density |

The system is now structurally sound. Everything below is the next maturity tier: optical precision, behavioral choreography, automation depth, and coverage.

---

## 2. Visual alignment audit (mobile-UI optics)

These are the pixel-level reasons a screen can still feel "almost right." Ordered by visibility.

### V1 — NavigationBar compact title is not optically centered
`NavigationBar.css` chrome row: `grid-template-columns: minmax(44px, auto) minmax(0,1fr) minmax(44px, auto)`. With one leading button and two trailing buttons, the auto columns are unequal and the "centered" title drifts left. Native iOS bars keep the title at true screen center regardless of side content.
**Fix:** `grid-template-columns: 1fr auto 1fr` with leading `justify-self: start` / trailing `justify-self: end`, plus `min-width: var(--layout-touch-target-min)` on the side slots. Add a Storybook story with asymmetric actions to lock it.

### V2 — ListRow trailing value centers vertically instead of aligning to the title line
`ListRow.css` uses `align-items: center` on the row; with title + description the trailing text floats mid-height. iOS aligns the trailing value with the title's first line.
**Fix:** when description exists, `align-self: flex-start` on `__trailing-text`/`__trailing-slot` + `padding-block-start` matching the title's half-leading (or switch the row to baseline alignment for text-only trailing). Keep center alignment for single-line rows.

### V3 — No leading-trim: half-leading pollutes every "centered" label
Inter's half-leading makes button labels sit ~1px low, makes Card header spacing visually heavier above text than below, and makes Badge text ride high in its 16px pill. This is the single biggest remaining "indefinably off" factor.
**Fix:** progressive enhancement in `typography.css`:
```css
@supports (text-box: trim-both cap alphabetic) {
  .openui-button__label, .openui-badge, .openui-list-row__title, … { text-box: trim-both cap alphabetic; }
}
```
Scope to single-line UI labels only (never body copy). Add a `--text-trim` utility class on `Text`.

### V4 — Variable font axes not activated
`InterVariable.woff2` carries the `opsz` axis but `font-optical-sizing: auto` is never set, so body text renders without optical compensation.
**Fix:** add `font-optical-sizing: auto;` to `body` in `global.css`. Optionally expose `--text-features-ui: "cv11" 1` (open digits) as an opt-in token; do not force globally.

### V5 — Icon-to-text pairing has no rule
`iconSize` ramp (16/20/24, default `lg`=24) is sound, but components choose sizes ad hoc; a 24px icon beside 17px body text reads oversized, and ListRow chevrons compete with content.
**Fix:** document a pairing table in `ICON-RULES.md` and enforce in components: body/headline (17px) → `md` 20; subheadline/footnote → `sm` 16; large-title rows / hero → `lg` 24. ListRow chevron → `sm` + `--color-icon-soft400` + `stroke="thin"` at small sizes (Lucide strokes look heavy below 20px — pair `sm` with 1.5 stroke by default in the `Icon` wrapper).

### V6 — Skeleton shimmer desynchronizes
`Skeleton.css` animates each `::after` from mount, so multiple skeletons shimmer out of phase (checkerboard effect on a loading screen).
**Fix:** sync to a global clock: `animation-delay: calc(-1 * (var(--motion-duration-loading) - mod(<time-from-load>, …)))` is impractical in pure CSS — simplest robust fix is `animation-timeline` fallback or a shared negative delay set via a `--skeleton-epoch` inline style from a tiny provider, or accept phase-lock by using `animation-delay: 0s` with `animation-name` on a parent group (`.openui-skeleton-group` that paints one gradient across children via `background-attachment: fixed`-style positioning).

### V7 — Dark mode lacks an elevation tint ramp
Dark shadows are recalibrated (good) but every dark surface uses the same `--color-bg-white0` (#171717). Sheets, dialogs, toasts, and cards should get progressively lighter as they elevate (Material dark elevation; iOS does this with materials).
**Fix:** add `--color-bg-elevated-1/2/3` (dark: #1C1C1C / #222 / #262626; light: all = white0) and map: Card surface → 1, Sheet/ActionSheet → 2, Dialog/Toast → 3. Wire through `--elevation-*` bundles in `elevation.css`.

### V8 — Remaining physical properties (RTL risk)
`Avatar.css` uses `right: 0` (status dot). Everything else already uses logical properties.
**Fix:** `inset-inline-end: 0`; add a guardrail banning `left:|right:|margin-left|padding-right…` in `src/components/**/*.css` (allowlist `text-align` values); add RTL (`dir="rtl"`) to the visual matrix.

### V9 — Toast/ActionSheet still opaque while bars are glass
Material consistency: floating ephemeral surfaces should share the glass language now that bars have it.
**Fix:** Toast → `--surface-glass-bg-strong` + blur (keep solid fallback); ActionSheet panel can stay solid (it's a focused surface) but its grouped iOS style typically uses thick material — optional.

### V10 — Badge/caption vertical metrics
Caption2 (11/13) inside the 16px badge leaves uneven top/bottom. After V3's text-box trim this resolves; until then nudge with `line-height: 1` inside fixed-height pills.

---

## 3. Guardrails audit — what the current script can't catch

`scripts/check-guardrails.mjs` now covers: external-system refs, required CSS imports, hex in shadows, ungated `:hover`, fractional gap calcs, story CSS in components, enter/exit keyframe pairing, gap-as-dimension, test-runner matrix, docs keyword presence. Gaps:

| # | Gap | Add |
|---|-----|-----|
| G1 | **No contrast automation.** a11y addon exists but nothing fails CI on contrast regressions | Run axe in `test-runner.ts` per story (`@axe-core/playwright` or storybook a11y test integration); fail on WCAG AA for text & interactive elements, both themes |
| G2 | **Visual matrix misses states.** Light/dark × density snapshots only capture rest state; a pressed/focus regression ships silently | Add `storybook-addon-pseudo-states`; snapshot `:hover`-gated off, `:focus-visible`, `:active`, and disabled rows in the matrix for interactive components |
| G3 | **No RTL coverage** | Add `dir="rtl"` dimension to `visualMatrix` (at least Button, ListRow, NavigationBar, Input, Toast); pair with V8 physical-property ban |
| G4 | **No stylelint.** All CSS rules are bespoke regex; declaration-order, duplicate-property, descending-specificity issues are unchecked | Add `stylelint` + `stylelint-config-standard` + `stylelint-order`; migrate the regex bans that map to existing plugins (`declaration-property-value-disallowed-list` for physical props, `color-no-hex` scoped to components) |
| G5 | **No CSS budget.** `dist/styles.css` grows with every component (~5,100 source lines already) | Add a size check (e.g. gzip ≤ 30KB now, alert at +10%/release); also verify tree-shaking: per-component CSS imports actually split via `sideEffects` config |
| G6 | **Token ↔ docs parity is keyword-grep only** | Generate token tables in docs from `src/tokens/*.ts` (script writes md fragments; guardrail diffs them) so `RADIUS-RULES.md` etc. can never drift |
| G7 | **No a11y-prop enforcement in TSX** | Type-level: `IconButton`/`Icon`-only `Button` should require `aria-label` (discriminated union); add eslint rule or type test |
| G8 | **No interaction tests** | Storybook `play` functions for: Sheet open→close (exit anim completes before unmount), Select keyboard nav, Dialog focus trap, Switch toggling — run in test-runner |
| G9 | **Touch-target audit is manual** | test-runner check: for every story tagged `interactive`, assert bounding box ≥ 44×44 (or expanded hit-area pseudo-element present) in default density |
| G10 | **Concentric-radius rule unenforced** | Lintable heuristic: flag `border-radius: var(--radius-*)` on a direct child of a padded parent with radius unless using `calc(outer - inset)` or a documented pair; at minimum add to `COMPONENT-CHECKLIST.md` gate |

---

## 4. Interface upliftment — next-level behaviors

The kit now looks right at rest. The next tier is *choreography between states* — what separates a component library from a product-grade system.

### U1 — Scroll-driven NavigationBar collapse (P0)
Large-title and compact variants both exist, but nothing transitions between them. The iOS signature move — large title collapses into the compact bar with the glass fading in — is currently impossible.
Build: a `Screen`-level scroll contract (`onScroll` → `data-scrolled` + progress var `--nav-collapse: 0..1`) driving title scale/opacity crossfade and `--scrolled-under` activation. Use CSS scroll-driven animations (`animation-timeline: scroll()`) where supported, JS fallback. Deliver as `NavigationBar` + `Screen` integration + a `StickyHeader` recipe.

### U2 — Sheet drag-to-dismiss (P0)
The handle is decorative. Add pointer-driven drag: panel follows finger (transform, no transition while dragging), rubber-bands above rest, dismisses past 30% or velocity threshold, otherwise springs back (`--motion-ease-expressive`). Scrim opacity tracks drag progress. This single gesture is the most felt "premium" delta on mobile.

### U3 — Pressable primitive (P0 — unblocks everything)
Press logic (state layer + scale + hit-area + `@media (hover)` + haptic hook point) is duplicated across 10+ components. Extract `Pressable` (checklist P1) as the base for Button/IconButton/ListRow/Chip/TabBar items/Card-interactive. Include `onPressStart/End` for future haptics and long-press.

### U4 — Toast choreography v2 (P1)
Stack management: older toasts scale to 0.96/translate up behind the newest (3 max), swipe-to-dismiss horizontal, timer pause on press. Glass surface per V9.

### U5 — Segmented control sliding thumb (P1)
Verify the selection animates as one moving thumb (shared layout animation), not a background swap per item; if not yet, implement via a measured `::before` translated with `--motion-transition-surface`.

### U6 — Keyboard avoidance + safe-area utilities (P1)
`useSafeArea` + `useKeyboardInset` (visualViewport API) so Sheets/Inputs/footers rise above the on-screen keyboard inside the device frame. Currently nothing handles it; any form demo breaks the illusion.

### U7 — Haptics contract (P2)
No web haptics, but document the mapping now (selection-change → light, success toast → success, destructive confirm → warning) as `data-haptic` attributes emitted by components, so a React Native / Capacitor consumer can bind them. Add `HAPTICS-RULES.md`.

### U8 — Brand theming hook (P2)
Primary is hardcoded blue. Document the override surface (`--color-primary-*` + state layers + focus rings derive via `color-mix` already) and ship one alternate theme in Storybook (e.g. teal) to prove the system retints cleanly — this is also the test that no component still hard-references blue.

### U9 — Reduced-transparency & contrast media queries (P2)
Glass surfaces should respect `prefers-reduced-transparency` (fall back to solid) and `prefers-contrast: more` (strengthen hairlines to 1px, text-sub600 → strong950).

---

## 5. Component development roadmap

Source of truth remains `docs/COMPONENT-CHECKLIST.md` (88 unchecked items). Prioritized into waves by (a) unblocking power, (b) screen-coverage frequency, (c) visual risk if absent. Optional commerce/auth/messaging sections deferred entirely.

### Wave A — Primitives that unblock everything else (~1.5 weeks)
| Component | Why first |
|-----------|-----------|
| `Pressable` | Deduplicates press/state-layer/hit-area logic (U3); everything interactive rebases onto it |
| `Portal` + `FocusTrap` | Sheet/Dialog/ActionSheet currently each solve layering & focus alone; required before Tooltip/DropdownMenu/Popover |
| `VisuallyHidden` | A11y floor for icon-only controls |
| `Slot` / `asChild` | Lets Button/ListRow render as `a`/router links without style forks |
| `ThemeProvider` hardening | Scoped theming (nested light card in dark screen), replaces raw `data-theme` on `<html>` |
| `Box` + `Inset` + `Spacer` | Layout floor so demo screens stop hand-rolling div+style |

### Wave B — List & form completion (the 80% of real screens) (~2 weeks)
| Component | Notes |
|-----------|-------|
| `List` + `ListHeader/Footer` + `KeyValueRow` | Formalize the inset-grouped list (iOS Settings pattern); ListRow is `[~]` — close it (V2 baseline fix lands here) |
| `RadioGroup` + `CheckboxGroup` | Group semantics, error propagation to Field message |
| `Slider` | High visual-signature control; thumb shadow `--shadow-component-toggle-switch`, haptic ticks (U7) |
| `Stepper` | Quantity +/- with press-and-hold repeat |
| `OTPInput`, `PasswordInput`, `NumberInput` | Compose from Input shell; OTP is the showcase for caret/auto-advance polish |
| `Form` | Field orchestration: validation states, submit-disable, scroll-to-error |
| `Accordion` | Uses `--motion-transition-layout` (currently unused token) |

### Wave C — Navigation & overlays (~2 weeks)
| Component | Notes |
|-----------|-------|
| `BackButton` + `Toolbar` | Completes NavigationBar pattern (checklist P0 "Toolbar / nav bar") |
| `Tooltip` + `Popover` + `DropdownMenu` | On Portal/FocusTrap from Wave A; `--shadow-component-tooltip` token already waiting |
| `FullScreenCover` | Push-style modal page; pairs with U1 scroll contract |
| `StepIndicator` + `Pagination` + `PageIndicator` (dots) | Onboarding/carousel dependencies |
| `FAB` + `ButtonGroup` + `LinkButton` | Action set completion |
| `SearchBar` → searchable-list recipe | Cancel-button slide-in choreography (iOS signature) |

### Wave D — Content & status (~1.5 weeks)
| Component | Notes |
|-----------|-------|
| `Image` (+ aspect ratio, skeleton integration, fade-in on load) | P1; every media card depends on it |
| `StatCard`, `MediaCard`, `ListCard`, `Panel` | Card family on existing Card variants |
| `Tag`, `StatusDot`, `AvatarGroup`, `InlineMessage`, `ErrorState`, `OfflineBanner` | Status floor; ErrorState/EmptyState share anatomy |
| `Heading`, `Label`, `Link`, `TruncatedText` | Typography components over existing `Text` roles |
| `CompactTable`, `Timeline`, `Feed` | Defer to end of wave; need List foundation |

### Wave E — Patterns & recipes (proof of system) (~2 weeks, parallel-friendly)
Settings group (inset list) → Profile header → Onboarding carousel → Login/sign-up → OTP verification → Search results → Pull-to-refresh list → Infinite scroll footer → Permission prompt. Each ships as a Storybook "Patterns" story inside the device frame, dark+light, using only public API — these recipes are the regression suite for taste.

### Utilities backlog (slot into waves as needed)
`useMediaQuery`, `useSafeArea` (U6), motion wrapper/`AnimatePresence`-equivalent for exit-before-unmount (generalize the Sheet/Toast close pattern into a `usePresence` hook — currently per-component logic), `ScrollArea`, `Section`, `Grid`, `StickyHeader` (U1), `SafeArea`.

---

## 6. Sequencing

```
Track 1 (visual precision):  V1–V5, V8, V10 → V3 trim rollout → V6, V7, V9
Track 2 (guardrails):        G1–G3 (CI teeth) → G4–G5 → G6–G10
Track 3 (behavior):          U3 Pressable → U1 nav collapse + U2 sheet drag → U4–U6
Track 4 (components):        Wave A → B → C → D → E  (A blocks B/C; D/E parallel after B)
```

Tracks 1–2 are independent and can start immediately. Track 3's U3 should land before Wave B rebuilds begin so new components are born on `Pressable`. Total: ~9–10 working weeks solo; first visible jump (Track 1 + U1 + U2) in ~2 weeks.

## 7. Definition of "perfect DS" (exit criteria)

1. Compact nav title sits at true screen center with any action count; trailing list values align to title lines; no single-line label shows half-leading drift (text-box trim live).
2. Dark mode has a visible elevation tint ramp; glass respects reduced-transparency; RTL snapshot suite green.
3. CI fails on: contrast < AA, missing pressed/focus snapshot diff, physical CSS properties, CSS budget breach, token-doc drift, sub-44px touch targets.
4. NavigationBar collapses on scroll; Sheet dismisses by drag with spring return; all interactive components share one `Pressable` core.
5. Checklist P0/P1 rows all `[x]`; the nine Wave E pattern recipes render pixel-credible in the device frame in both themes.
6. A third-party can re-brand primary color via tokens alone and every state/focus/selection retints with zero component edits.
