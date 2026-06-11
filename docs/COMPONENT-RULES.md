# Component rules

Rules for humans and AI when **creating or changing design system components** (`src/components/`).  
Applies to the current core set (`Icon`, `Text`, `Stack`, `Screen`, `Button`, `Input`, `Field`, `Card`, `ListRow`) and future primitives.

**Always also read** the foundational rule files for tokens used by the component:  
[COLOR](./COLOR-RULES.md) · [TYPOGRAPHY](./TYPOGRAPHY-RULES.md) · [ICON](./ICON-RULES.md) · [LAYOUT](./LAYOUT-RULES.md) · [SHADOW](./SHADOW-RULES.md) · [RADIUS](./RADIUS-RULES.md) · [MOTION](./MOTION-RULES.md)

---

## Hard rules (never break)

1. **Tokens only** — Components consume `var(--color-*)`, `var(--text-*)`, `var(--layout-*)`, `var(--radius-*)`, `var(--shadow-*)`, `var(--motion-*)`, and icon tokens. No embedded hex, spacing, shadow, motion, or radius constants except re-exporting token maps.

2. **One component, one folder** — `src/components/{Name}/{Name}.tsx`, `index.ts`, optional stories under `src/stories/components/`.

3. **Export from barrel** — Public API via `src/components/index.ts`.

4. **Typed props** — TypeScript props for variants; variant names match token semantic names (`size="md"`, not `size="medium2"`).

5. **Forward refs when focusable** — Inputs, buttons: `forwardRef` for native element access.

6. **Accessibility built in** — Focus styles, labels, roles, keyboard support per component type. Icons: see [ICON-RULES.md](./ICON-RULES.md).

7. **Theme-agnostic** — Components must render in light and dark without variant props for theme.

8. **No business logic** — DS components are presentational. Data fetching and routing live in the app.

9. **Compose, don’t duplicate** — Use existing `Icon`, layout patterns, and tokens before adding props that restyle children ad hoc.

10. **Document in Storybook** — Every component has stories: variants, states (disabled, loading), and theme toggle check.

11. **Storybook-only utilities** — `DeviceFrame`, `LucideFullCatalog`, and similar live under `src/storybook/`. They are **not** exported from `src/components/`. Screen previews use `DeviceFrame`; do not import it in product app code.

12. **Storybook-only CSS** — story helper classes (`.openui-*-story-*`) live in `src/styles/storybook.css`, not component CSS. Component CSS is shipped in the package and must stay production-only.

13. **Mobile scrollbar chrome hidden** — Components that create mobile scrolling regions hide visible scrollbars while preserving scrolling behavior.

14. **RTL-safe component CSS** — Use logical inline properties (`inset-inline-*`, `margin-inline-*`, `padding-inline-*`, `border-inline-*`) instead of `left`, `right`, `margin-left`, or `padding-right`. Guardrails ban physical inline properties in `src/components/**/*.css`.

15. **Do not trim text boxes** — Component labels keep their full token line-height. Do not use `text-box` / cap-height trimming in shipped component CSS because it can clip Inter glyphs inside mobile controls.

16. **Pressable for tactile interaction** — New tappable primitives should use `Pressable` for press lifecycle callbacks, state-layer feedback, compact hit-area expansion, and `data-haptic` metadata instead of duplicating pointer/key handling.

17. **Portal + FocusTrap for overlays** — Dialogs, sheets, action sheets, popovers, menus, and toasts that leave normal document flow use `Portal` for root stacking. Modal surfaces use `FocusTrap` for Tab containment, Escape handling, and focus restoration.

18. **Dismissible sheets have active handles** — A `Sheet` with `onClose` exposes drag-to-dismiss from the handle by default. The panel follows the pointer, the scrim fades with progress, quick downward flicks dismiss, and cancelled drags spring back with motion tokens.

---

## Component API pattern

```tsx
export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';  // maps to layout + type tokens
  disabled?: boolean;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<'button'>;
```

- **Variants** → semantic color roles, not raw palette  
- **Sizes** → map to `layout` + `typography` tokens internally  
- **className** → allowed for layout positioning only; not for changing brand colors  
- **Compact mobile controls** → the hit target must be at least 44px, but the visible mark/pill does not need to be 44px tall. Use an expanded wrapper or pseudo hit area for compact chips, checkbox marks, radio marks, and trailing row controls.
- **Logical inline layout** → mirrorable details such as status dots, trailing icons, and row actions use logical inline placement so RTL stories behave like LTR.
- **Text inside controls** → keep token line-height intact and center with flex/grid; avoid cap-height trim hacks.
- **Press feedback** → prefer `Pressable` when a component needs scale, state-layer, compact hit-area, or press lifecycle behavior.
- **Overlay plumbing** → prefer `Portal`, `FocusTrap`, and `usePresence` when a component needs root stacking, modal focus containment, Escape behavior, or exit-before-unmount animation.
- **Sheet gestures** → keep sheet drag behavior tied to `onClose`; do not make the handle decorative when the sheet is dismissible.
- **Hidden accessible text** → use `VisuallyHidden` for semantic labels that should stay available to assistive technology without adding visible chrome.

---

## File structure template

```
src/components/Button/
  Button.tsx          # implementation
  Button.module.css   # optional; prefer CSS variables
  index.ts            # export Button, ButtonProps
src/stories/components/Button.stories.tsx
```

---

## Styling order of preference

1. CSS variables from token stylesheets (global)  
2. Component CSS file using only `var(--*)`  
3. Inline styles only for dynamic values computed from tokens in TS  

Never: hard-coded design values in styled-components/theme objects unless generated from `src/tokens/`.

---

## Checklist for new components

- [ ] Read all applicable `docs/*-RULES.md` files  
- [ ] Props map to semantic tokens (document mapping in story description)  
- [ ] Light + dark verified  
- [ ] Touch target ≥ 44px if interactive ([LAYOUT-RULES.md](./LAYOUT-RULES.md))  
- [ ] RTL-safe: no physical inline CSS properties in component styles
- [ ] Text is not clipped: no `text-box` trim in shipped component CSS
- [ ] Tappable custom primitives use `Pressable` instead of duplicating press behavior
- [ ] Overlay components use `Portal`, `FocusTrap`, and `usePresence` instead of duplicating root stacking, focus trapping, Escape handling, or closing state
- [ ] Dismissible sheets keep an active drag handle and keyboard/click fallback for dismissal
- [ ] Assistive-only text uses `VisuallyHidden`
- [ ] Typography from `--text-*` ([TYPOGRAPHY-RULES.md](./TYPOGRAPHY-RULES.md))  
- [ ] Exported from `src/components/index.ts`  
- [ ] Storybook under `Components/{Name}`  
- [ ] `npx tsc --noEmit` passes  

---

## `Icon` (reference implementation)

| Rule | Implementation |
|------|----------------|
| Wraps third-party primitive | Lucide `LucideIcon` |
| Token props | `size`, `color`, `stroke` |
| a11y | `label` → `aria-label` / decorative hidden |
| Location | `src/components/Icon/Icon.tsx` |

New components should follow the same token-prop pattern.

---

## Do not

- Ship components with `color` prop accepting arbitrary strings  
- Import primitives (`primitiveColors`, `space[4]`) inside components  
- Add shadcn/MUI/Chakra components into `src/components/` without token adaptation  
- Create `Box` with `padding={13}` escape hatch  
- Skip Storybook because “it’s just internal”  

---

## File map

| What | Where |
|------|--------|
| Components | `src/components/` |
| Component stories | `src/stories/components/` (create when needed) |
| Storybook helper CSS | `src/styles/storybook.css` |
| Storybook utilities | `src/storybook/` (`DeviceFrame`, catalogs) |
| Tokens | `src/tokens/` |
| Device / layout rules | [DEVICE-RULES.md](./DEVICE-RULES.md), [LAYOUT-RULES.md](./LAYOUT-RULES.md) |
| Master index | [docs/README.md](./README.md) |
| Composite screens | [PATTERN-RULES.md](./PATTERN-RULES.md) |
