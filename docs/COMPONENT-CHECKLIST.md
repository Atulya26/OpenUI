# OpenUI component checklist

Master checklist for building the mobile design system on branch `feature/components`.  
Scope: **iPhone-first** (402×874), HIG-aligned, token-driven.

**Legend:** `[x]` done · `[~]` partial / needs hardening · `[ ]` not started

**Related:** [COMPONENT-RULES.md](./COMPONENT-RULES.md) · [PATTERN-RULES.md](./PATTERN-RULES.md) · [VISUAL-LANGUAGE.md](./VISUAL-LANGUAGE.md) · [docs/README.md](./README.md)

---

## How to use

1. Pick a **phase** (bottom of this file) or work top-down within a section.
2. When a component ships: mark `[x]`, add Storybook story, export from `src/components/index.ts`.
3. Update status in the **Summary** table when a section is mostly complete.
4. Do **not** build desktop-only patterns (sidebar, dense tables, 12-col grids).
5. New animation must use `--motion-duration-*` and `--motion-ease-*` tokens so `prefers-reduced-motion` can zero movement globally.

---

## Summary

| Section | Done | Partial | Remaining |
|---------|------|---------|-----------|
| Foundations | 10 | 1 | 0 |
| Layout & structure | 3 | 0 | 8 |
| Typography | 1 | 0 | 5 |
| Actions | 2 | 0 | 6 |
| Form controls | 10 | 0 | 15 |
| Selection & chips | 3 | 0 | 3 |
| Feedback & status | 6 | 0 | 5 |
| Navigation | 3 | 0 | 6 |
| Overlays & sheets | 4 | 0 | 7 |
| Lists & collections | 2 | 0 | 8 |
| Cards & surfaces | 1 | 0 | 6 |
| Media & content | 1 | 0 | 7 |
| Commerce (optional) | 0 | 0 | 5 |
| Auth UI (optional) | 0 | 0 | 4 |
| Messaging (optional) | 0 | 0 | 5 |
| Patterns (recipes) | 3 | 1 | 12 |
| Utilities | 0 | 1 | 6 |

---

## 0. Foundations

| Status | Item | Notes |
|--------|------|-------|
| [x] | Color tokens | `tokens.css`, themes |
| [x] | Typography tokens | HIG mobile scale |
| [x] | Icons + `Icon` | Lucide, curated set |
| [x] | Layout / spacing | `layout.css`, 4px grid |
| [x] | Device / `DeviceFrame` | iPhone 402×874 |
| [x] | Radius tokens | `radius.css` |
| [x] | Shadow tokens | `shadows.css` |
| [x] | Motion tokens | `motion.css` |
| [~] | Focus / a11y tokens | Outlines on Button/Input/Input actions; no `FocusRing` util |
| [x] | Z-index / elevation scale | `elevation.css`, `ELEVATION-RULES.md` |
| [x] | Opacity / blur (glass) | `surfaces.css`, TabBar fixed, NavigationBar scrolled-under |

---

## 1. Layout & structure

| Status | Component | Priority |
|--------|-----------|----------|
| [x] | `Screen` | P0 |
| [x] | `Stack` | P0 |
| [ ] | `Box` / `View` | P1 |
| [ ] | `Spacer` | P2 |
| [x] | `Divider` / `Separator` | P1 |
| [ ] | `ScrollArea` | P1 |
| [ ] | `Section` | P1 |
| [ ] | `Inset` | P2 |
| [ ] | `Grid` | P2 |
| [ ] | `StickyHeader` | P2 |
| [ ] | `SafeArea` | P2 |

---

## 2. Typography

| Status | Component | Priority |
|--------|-----------|----------|
| [x] | `Text` | P0 |
| [ ] | `Heading` | P1 |
| [ ] | `Label` | P1 |
| [ ] | `Link` | P1 |
| [ ] | `Code` / `Mono` | P3 |
| [ ] | `TruncatedText` | P2 |
| [ ] | `RichText` | P3 |

---

## 3. Actions

| Status | Component | Priority |
|--------|-----------|----------|
| [x] | `Button` | P0 |
| [x] | `IconButton` | P0 |
| [ ] | `ButtonGroup` | P2 |
| [ ] | `FAB` | P2 |
| [ ] | `LinkButton` | P2 |
| [ ] | `SwipeAction` | P3 |
| [x] | `Pressable` | P1 |
| [ ] | `HoldMenu` | P3 |

---

## 4. Form controls

| Status | Component | Priority |
|--------|-----------|----------|
| [x] | `Field` | P0 |
| [x] | `Input` | P0 |
| [x] | `TextArea` | P1 |
| [x] | `SearchBar` | P1 |
| [ ] | `OTPInput` | P2 |
| [ ] | `PasswordInput` | P2 |
| [ ] | `PhoneInput` | P3 |
| [ ] | `NumberInput` | P2 |
| [x] | `Select` | P1 |
| [ ] | `Combobox` | P3 |
| [ ] | `Autocomplete` | P3 |
| [x] | `Checkbox` | P1 |
| [ ] | `CheckboxGroup` | P2 |
| [x] | `Radio` | P1 |
| [ ] | `RadioGroup` | P1 |
| [x] | `Switch` | P1 |
| [x] | `SegmentedControl` | P1 |
| [ ] | `Slider` | P2 |
| [ ] | `Stepper` | P2 |
| [ ] | `DatePicker` | P2 |
| [ ] | `TimePicker` | P2 |
| [ ] | `DateRangePicker` | P3 |
| [ ] | `ColorPicker` | P3 |
| [ ] | `FileUpload` | P2 |
| [ ] | `Form` | P2 |

---

## 5. Selection & identity

| Status | Component | Priority |
|--------|-----------|----------|
| [x] | `Chip` | P1 |
| [ ] | `Tag` | P2 |
| [x] | `Badge` | P1 |
| [x] | `Avatar` | P1 |
| [ ] | `AvatarGroup` | P2 |
| [ ] | `Presence` | P3 |

---

## 6. Feedback & status

| Status | Component | Priority |
|--------|-----------|----------|
| [x] | `Alert` | P1 - supported by `Dialog status="warning" / "error"` |
| [x] | `Banner` | P1 |
| [x] | `Toast` / `Snackbar` | P1 |
| [ ] | `InlineMessage` | P1 |
| [x] | `Progress` | P1 - `ProgressBar` |
| [x] | `Spinner` / `ActivityIndicator` | P1 |
| [x] | `Skeleton` | P1 |
| [x] | `EmptyState` | P1 |
| [ ] | `ErrorState` | P1 |
| [ ] | `OfflineBanner` | P2 |
| [ ] | `Rating` | P3 |
| [ ] | `StatusDot` | P2 |

---

## 7. Navigation

| Status | Component | Priority |
|--------|-----------|----------|
| [x] | `NavBar` / `TopBar` | P0 |
| [x] | `LargeTitleNavBar` | P1 - supported by `NavigationBar size="large"` |
| [x] | `TabBar` | P0 |
| [ ] | `Toolbar` | P2 |
| [ ] | `BackButton` | P1 |
| [ ] | `Breadcrumb` | P3 |
| [ ] | `Pagination` | P2 |
| [ ] | `StepIndicator` | P2 |
| [ ] | `SideMenu` | P2 |

---

## 8. Overlays & sheets

| Status | Component | Priority |
|--------|-----------|----------|
| [x] | `Modal` | P1 - `Dialog` |
| [x] | `AlertDialog` | P1 - `Dialog` with alert status |
| [x] | `BottomSheet` | P0 - `Sheet` bottom placement |
| [x] | `ActionSheet` | P1 |
| [ ] | `Popover` | P3 |
| [ ] | `Tooltip` | P2 |
| [ ] | `DropdownMenu` | P2 |
| [ ] | `ContextMenu` | P3 |
| [ ] | `FullScreenCover` | P2 |
| [ ] | `Drawer` | P3 |
| [x] | `Portal` | P1 |
| [x] | `FocusTrap` | P1 |

---

## 9. Lists & collections

| Status | Component | Priority |
|--------|-----------|----------|
| [ ] | `List` | P1 |
| [x] | `ListRow` | P0 — leading/trailing slots, states, sizes |
| [x] | `ListSection` | P1 — grouped mobile list wrapper |
| [ ] | `ListHeader` / `ListFooter` | P2 |
| [ ] | `Accordion` | P1 |
| [ ] | `Timeline` | P3 |
| [ ] | `Feed` | P2 |
| [ ] | `CompactTable` | P2 |
| [ ] | `KeyValueRow` | P1 |
| [ ] | `ReorderableList` | P3 |

---

## 10. Cards & surfaces

| Status | Component | Priority |
|--------|-----------|----------|
| [x] | `Card` | P0 — variants, padding, radius, selected, interactive, structure slots |
| [ ] | `Panel` | P1 |
| [ ] | `AccordionCard` | P2 |
| [ ] | `MediaCard` | P2 |
| [ ] | `StatCard` | P2 |
| [ ] | `HeroCard` | P3 |
| [ ] | `ListCard` | P2 |

---

## 11. Media & content

| Status | Component | Priority |
|--------|-----------|----------|
| [x] | `Icon` | P0 |
| [ ] | `Image` | P1 |
| [ ] | `ImageCarousel` | P2 |
| [ ] | `Video` | P3 |
| [ ] | `AudioPlayer` | P3 |
| [ ] | `LocationRow` | P3 |
| [ ] | `QRCode` | P3 |
| [ ] | `Illustration` | P2 |

---

## 12. Commerce (optional)

| Status | Component | Priority |
|--------|-----------|----------|
| [ ] | `Price` | P3 |
| [ ] | `QuantitySelector` | P3 |
| [ ] | `ProductCard` | P3 |
| [ ] | `CartBar` | P3 |
| [ ] | `PaymentMethodRow` | P3 |

---

## 13. Auth UI (optional)

| Status | Component | Priority |
|--------|-----------|----------|
| [ ] | `PinPad` | P3 |
| [ ] | `BiometricPrompt` | P3 |
| [ ] | `SocialSignInButton` | P3 |
| [ ] | `TermsCheckbox` | P3 |

---

## 14. Messaging (optional)

| Status | Component | Priority |
|--------|-----------|----------|
| [ ] | `MessageBubble` | P3 |
| [ ] | `Composer` | P3 |
| [ ] | `ThreadListRow` | P3 |
| [ ] | `ReactionBar` | P3 |
| [ ] | `StoryRing` | P3 |

---

## 15. Patterns (recipes — document + Storybook)

Patterns compose components; extend [PATTERN-RULES.md](./PATTERN-RULES.md).

| Status | Pattern | Priority |
|--------|---------|----------|
| [x] | Screen scaffold | P0 |
| [x] | Form stack | P0 |
| [~] | List row | P0 |
| [ ] | Toolbar / nav bar | P0 |
| [ ] | Empty state | P1 |
| [ ] | Alert / banner | P1 |
| [ ] | Settings group (inset list) | P1 |
| [ ] | Onboarding carousel | P2 |
| [ ] | Login / sign-up flow | P2 |
| [ ] | OTP verification | P2 |
| [ ] | Profile header | P2 |
| [ ] | Search results | P2 |
| [ ] | Pull-to-refresh list | P2 |
| [ ] | Infinite scroll footer | P2 |
| [ ] | Permission prompt | P2 |
| [ ] | Paywall / upgrade | P3 |

---

## 16. Utilities

| Status | Utility | Priority |
|--------|---------|----------|
| [x] | `VisuallyHidden` | P1 |
| [ ] | `Slot` / `asChild` | P2 |
| [~] | `ThemeProvider` | P0 — `data-theme` on `<html>` today |
| [ ] | `useMediaQuery` | P2 |
| [x] | `useSafeArea` | P2 |
| [~] | Motion wrapper (`AnimatePresence`) | P2 — `usePresence` covers exit-before-unmount for overlays |

---

## Build phases

### Phase 1 — Unblock every screen (start here)

- [x] Harden `Button`
- [x] `IconButton`
- [x] Harden `Input`
- [x] Harden `Card`
- [x] Harden `ListRow`
- [x] `Divider`
- [x] `NavBar`
- [x] `TabBar`
- [x] `BottomSheet`
- [ ] `Modal`
- [ ] `Alert`
- [x] `Toast`
- [ ] `Spinner`
- [x] `Badge`
- [x] `Avatar`
- [x] `Checkbox`
- [x] `Switch`
- [x] `Select`

### Phase 2 — Forms & settings apps

- [x] `TextArea`
- [x] `SearchBar`
- [~] `Radio` + `RadioGroup`
- [x] `SegmentedControl`
- [ ] `Slider`
- [x] `ListSection`
- [ ] `Accordion`
- [ ] `EmptyState`
- [ ] `Skeleton`
- [ ] `ActionSheet`

### Phase 3 — Polish & density

- [ ] `FAB`
- [ ] `SwipeAction`
- [ ] `DatePicker`
- [ ] `OTPInput`
- [ ] `Progress`
- [ ] `ImageCarousel`
- [ ] Pull-to-refresh pattern
- [ ] `ReorderableList`

### Phase 4 — Vertical / optional

- [ ] Commerce block (§12)
- [ ] Auth block (§13)
- [ ] Messaging block (§14)

---

## Explicitly out of scope

- [ ] ~~Persistent sidebar / multi-panel desktop chrome~~
- [ ] ~~Dense data tables (10+ columns)~~
- [ ] ~~12-column dashboard grids~~
- [ ] ~~Landing-page 56px+ display type~~
- [ ] ~~Status bar / Dynamic Island drawn in code~~ (use `DeviceFrame` PNG)

---

## Per-component done criteria

When marking a component `[x]`, verify:

- [ ] Lives in `src/components/{Name}/`
- [ ] Exported from `src/components/index.ts`
- [ ] Uses tokens only (`--color-*`, `--layout-*`, `--radius-*`, `--shadow-*`, `--motion-*`)
- [ ] Storybook: variants + states + light/dark
- [ ] Meets 44px touch target where interactive
- [ ] `forwardRef` if focusable
- [ ] Documented in [COMPONENT-RULES.md](./COMPONENT-RULES.md) if API is non-obvious
