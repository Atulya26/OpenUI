# Motion rules

Rules for humans and AI when using motion in OpenUI.

**Navigation:** [docs/README.md](./README.md) · [LAYOUT](./LAYOUT-RULES.md) · [RADIUS](./RADIUS-RULES.md) · [SHADOW](./SHADOW-RULES.md) · [COMPONENT](./COMPONENT-RULES.md)

---

## Hard rules (never break)

1. **Motion is purposeful** — Use motion to explain continuity, confirm feedback, or guide attention. Do not animate because an element exists.

2. **Tokens only** — Use `var(--motion-*)` variables or exported motion tokens. No one-off `transition: 200ms ease`, raw cubic-bezier values, or custom spring curves in product CSS.

3. **Transform and opacity first** — Prefer `transform` and `opacity`. Avoid animating layout-heavy properties unless the semantic layout transition explicitly allows it.

4. **Reduced motion is mandatory** — Motion tokens collapse movement under `prefers-reduced-motion: reduce`. Do not bypass this with hard-coded animations.

5. **Fast frequent feedback** — Presses, focus changes, and small state changes use `--motion-transition-feedback`. Frequent UI should never feel like it is waiting for animation.

6. **Enter slower than exit** — Entering content gets enough time to settle. Exiting content leaves faster and should not bounce.

7. **Expressive motion is rare** — Use spring-like motion only for meaningful tactile emphasis, such as a success confirmation or one primary delight moment. Never use it on every card or row.

8. **No infinite decorative motion in product UI** — Loading, progress, and temporary feedback can loop. Ambient decorative loops need explicit design review.

---

## Token cheat sheet

| Need | CSS variable |
|------|--------------|
| Instant state | `--motion-duration-instant` |
| Press / focus feedback | `--motion-duration-feedback` + `--motion-ease-feedback` |
| Component state change | `--motion-duration-state` + `--motion-ease-state` |
| Content entering | `--motion-duration-enter` + `--motion-ease-enter` |
| Content exiting | `--motion-duration-exit` + `--motion-ease-exit` |
| Layout continuity | `--motion-duration-layout` + `--motion-ease-layout` |
| Rare expressive moment | `--motion-duration-expressive` + `--motion-ease-expressive` |
| Loading / progress loop | `--motion-duration-loading` + `--motion-ease-linear` |
| Control feedback contract | `--motion-transition-feedback` |
| Card / surface contract | `--motion-transition-surface` |
| Content reveal contract | `--motion-transition-content` |
| Layout reveal contract | `--motion-transition-layout` |

---

## Duration scale

| Token | Value | Use |
|-------|-------|-----|
| `--motion-duration-instant` | 0ms | Immediate state, no perceived transition |
| `--motion-duration-micro` | 90ms | Press, focus, hover/touch feedback |
| `--motion-duration-fast` | 140ms | Small state changes, exits |
| `--motion-duration-base` | 220ms | Content entering or simple reveals |
| `--motion-duration-slow` | 320ms | Layout continuity and surface movement |
| `--motion-duration-slower` | 420ms | Large but still responsive screen moments |
| `--motion-duration-celebration` | 520ms | Rare confirmation or delight |
| `--motion-duration-loop` | 900ms | Loading and progress loops |

---

## Easing roles

| Token | Use |
|-------|-----|
| `--motion-ease-standard` | Everyday state changes |
| `--motion-ease-emphasized-decelerate` | Content entering and settling |
| `--motion-ease-emphasized-accelerate` | Content leaving quickly |
| `--motion-ease-smooth` | Layout movement inside the viewport |
| `--motion-ease-spring-soft` | Rare tactile emphasis |

---

## Component decisions

| Component | Motion |
|-----------|--------|
| `Button` | `--motion-transition-feedback`; active press scales to `--motion-scale-press` |
| `Input` | `--motion-transition-feedback` for border, shadow, color, and opacity |
| `Card` | `--motion-transition-surface` for surface and elevation changes |
| Future sheets / drawers | Enter with `--motion-ease-enter`; exit with `--motion-ease-exit` |
| Future list updates | Use content or layout transitions, not custom keyframes per row |

---

## AI checklist

- [ ] Read this file when adding transition or animation behavior
- [ ] Used `var(--motion-*)` or exported motion tokens only
- [ ] Motion communicates feedback, continuity, or hierarchy
- [ ] Used transform/opacity before layout-heavy properties
- [ ] Enter motion decelerates; exit motion accelerates
- [ ] Reduced motion still reaches the final state without movement
- [ ] Checked **Foundational → Motion** in Storybook
- [ ] `npm run check` passes

---

## File map

| File | Role |
|------|------|
| `src/tokens/primitives/motion.ts` | Duration, easing, and transform primitives |
| `src/tokens/semantic/motion.ts` | Semantic duration/easing/transition contracts |
| `src/tokens/motion.css` | `--motion-*` CSS variables and reduced-motion override |
| `src/tokens/motion.ts` | TS helpers and CSS variable builder |
| `src/stories/motion/Motion.stories.tsx` | Storybook foundation |

---

## Do not

- Use browser-default `ease` for product motion
- Paste custom cubic-bezier values into component CSS
- Animate width, height, top, left, or margin for high-frequency interactions
- Use bounce/spring exits
- Hide important information behind motion only
- Add decorative looping animation to generated screens by default
