# Haptics rules

Rules for humans and AI when adding haptic metadata to OpenUI interactions.

**Navigation:** [docs/README.md](./README.md) · [COMPONENT](./COMPONENT-RULES.md) · [MOTION](./MOTION-RULES.md)

---

## Hard rules (never break)

1. **Metadata only** — Web components emit `data-haptic` attributes through `Pressable`. Do not call `navigator.vibrate`, browser vibration APIs, or native haptic bridges from OpenUI components.

2. **Use `PressableHaptic`** — Public haptic props use the shared `PressableHaptic` type. Do not accept arbitrary strings.

3. **No behavior fork** — Haptics must not reimplement pointer, keyboard, long-press, or selection logic. Components that already delegate to `Pressable` may forward `haptic`; components that do not should migrate to `Pressable` in a separate interaction pass.

4. **Default stays silent** — `haptic` defaults to `none`, which omits `data-haptic`. Adding the prop must not change existing component behavior.

5. **Accessible state first** — Haptic metadata supplements visible, textual, and ARIA state. Never use haptics as the only confirmation of an action.

---

## Token cheat sheet

Haptics are not CSS tokens. Use the TypeScript union exported as `PressableHaptic`:

```ts
type PressableHaptic =
  | 'none'
  | 'light'
  | 'selection'
  | 'medium'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'error';
```

`Pressable` emits `data-haptic="{value}"` for every value except `none`.

---

## Mapping table

| Interaction | `data-haptic` value | Notes |
|-------------|---------------------|-------|
| Neutral press | `light` | Plain button, icon button, dismiss, or low-risk row action. |
| Selection change | `selection` | Use when a selected value changes, such as tabs, segmented controls, chips, picker rows, or filter toggles. Use `light` as a native fallback if the host does not expose selection haptics. |
| Success toast or confirmation | `success` | Use for a completed positive action, especially toast actions or submit confirmations. |
| Destructive confirm | `warning` or `destructive` | Use `warning` for the confirmation step and `destructive` when a native host has a stronger destructive pattern. |
| Long press | `medium` | Use only when a component already supports long press. The metadata marks the long-press affordance; it does not create long-press behavior. |
| Error or failed action | `error` | Use for failed submit, validation failure confirmation, or an error toast action when the host supports it. |

---

## Component decisions

| Component | Haptic contract |
|-----------|-----------------|
| `Pressable` | Owns the `haptic?: PressableHaptic` prop and emits `data-haptic` metadata only. |
| `Button` | May forward `haptic` to `Pressable`; default remains `none`. Neutral one-off actions use `light`; destructive confirmation can use `warning` or `destructive`. |
| `IconButton` | May forward `haptic` to `Pressable`; default remains `none`. Dismiss and toolbar presses usually use `light`. |
| `Toast` | Success actions use `success`; neutral dismiss/action controls use `light`. |
| Selection controls | Use `selection` when the selected value changes after they delegate to `Pressable`. |
| Long-press controls | Use `medium` only when long-press behavior already exists. |

---

## AI checklist

- [ ] Read this file when adding or forwarding haptic metadata
- [ ] Used `PressableHaptic`, not arbitrary strings
- [ ] Emitted only `data-haptic`; no browser vibration or native bridge calls
- [ ] Left default behavior unchanged by keeping `haptic` optional and silent
- [ ] Did not duplicate press, keyboard, or long-press handling
- [ ] Confirmed haptic metadata is supplemental to visible and ARIA feedback
- [ ] Ran `npm run typecheck` or explained why it was not feasible

---

## File map

| File | Role |
|------|------|
| `src/components/Pressable/Pressable.tsx` | `PressableHaptic` type and `data-haptic` emission |
| `src/components/Pressable/index.ts` | Public haptic type export |
| `src/components/Button/Button.tsx` | Optional haptic pass-through when using `Pressable` |
| `src/components/IconButton/IconButton.tsx` | Optional haptic pass-through when using `Pressable` |
| `src/stories/components/Pressable.stories.tsx` | Storybook documentation for the public haptic prop |

---

## Do not

- Call `navigator.vibrate` or equivalent web APIs
- Add haptic metadata to disabled controls
- Invent values outside `PressableHaptic`
- Use haptics to replace visible success, warning, error, or selection states
- Migrate components to `Pressable` as part of a haptics-only task unless that migration is explicitly in scope
