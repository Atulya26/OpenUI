# Icon rules

Rules for humans and AI when using icons in this design system.  
Reference: [Lucide React](https://lucide.dev/guide/react/).

**Navigation:** [docs/README.md](./README.md) · [COLOR](./COLOR-RULES.md) · [TYPOGRAPHY](./TYPOGRAPHY-RULES.md) · [LAYOUT](./LAYOUT-RULES.md) · [COMPONENT](./COMPONENT-RULES.md) · [PATTERN](./PATTERN-RULES.md)

---

## Hard rules (never break)

1. **Use the `Icon` component** — Wrap all Lucide icons with `Icon` from `@/components/Icon` in product UI (size, color, stroke, a11y).

2. **Tree-shake imports** — Import only the icons you need:
   ```ts
   import { Home, Settings } from 'lucide-react';
   // or curated:
   import { Home } from '@/components/Icon/icons';
   ```
   Never `import * as icons from 'lucide-react'` in app code.

3. **Tokenized size** — Use `size="sm" | "md" | "lg"` (16 / 20 / 24px). Avoid random `size={18}`. Numeric size only when documented exception.

4. **Tokenized color** — Use `color="strong" | "sub" | "soft" | "disabled" | "white" | "primary" | "inherit"`. Maps to `--color-icon-*` / `--color-primary-base`.

5. **Stroke preset** — Use `stroke="regular"` (default), `thin`, or `bold`. Do not set `strokeWidth={1.7}` without design review.

6. **Outline by default** — Lucide is stroke-based. No “filled” variant in the DS unless using Lucide’s documented `fill` + `strokeWidth={0}` for specific glyphs (stars, hearts) — see [filled icons](https://lucide.dev/guide/react/advanced/filled-icons).

7. **Accessibility** — Decorative icons: omit `label` (`aria-hidden`). Meaningful icons: pass `label="Description"`. Do not rely on icon alone for critical actions without a text label or `label`.

8. **Curated vs full set** — `@/components/Icon/icons` is a **mobile starter set** (~50). Full library (~1,700+) via `lucide-react` or Storybook **Catalog → All Lucide**. Do not copy-paste SVGs from the web.

9. **Align with layout** — Icon + text gap: `var(--layout-gap-inline-sm)`. Icon-only buttons: `min-width/height: var(--layout-touch-target-min)`.

---

## Token cheat sheet

| Prop | Values | px / notes |
|------|--------|------------|
| `size="sm"` | small | 16 — inline, dense UI |
| `size="md"` | medium | 20 — list rows, inputs |
| `size="lg"` | large | 24 — nav, tab bar (default) |
| `color="strong"` | primary icon | `--color-icon-strong950` |
| `color="sub"` | secondary | `--color-icon-sub600` |
| `color="soft"` | tertiary | `--color-icon-soft400` |
| `color="disabled"` | disabled | `--color-icon-disabled300` |
| `color="primary"` | brand | `--color-primary-base` |
| `stroke="regular"` | default | 2px |
| `stroke="thin"` | light | 1.5px |
| `stroke="bold"` | emphasis | 2.5px |

---

## When to use which size

| Context | Size |
|---------|------|
| Inline with `footnote` / `caption` | `sm` |
| List row, input adornment | `md` |
| Tab bar, toolbar, FAB area | `lg` |
| Next to `headline` button label | `md` or `lg` |

One icon size per control — do not mix `sm` and `lg` in the same button.

---

## Dynamic icons (CMS / runtime name)

- Storybook catalog may use `DynamicIcon` from `lucide-react/dynamic` for browsing only.
- Product code: prefer static imports. If dynamic is required, use `DynamicIcon` with typed `IconName` and loading fallback — do not bypass `Icon` token props.

---

## AI follow-up checklist (every icon change)

- [ ] `Icon` wrapper used with `icon={LucideComponent}` prop
- [ ] Named import from `lucide-react` or `@/components/Icon/icons`
- [ ] `size` and `color` are token enums, not raw numbers/colors
- [ ] `label` set when icon conveys meaning alone
- [ ] Touch target OK for icon-only interactive elements
- [ ] No filled icons unless glyph supports it and design approved
- [ ] No duplicate icon libraries (Font Awesome, etc.)

---

## Allowed exceptions (comment in PR)

- **Brand logos** — custom SVG component outside Lucide; do not pass through `Icon`
- **Illustrations** — multi-color artwork not subject to icon tokens
- **Animated loaders** — `Loader2` with CSS animation OK via `Icon`

---

## File map

| What | Where |
|------|--------|
| `Icon` component | `src/components/Icon/Icon.tsx` |
| Icon tokens | `src/tokens/icons.ts` |
| Curated exports | `src/components/Icon/icons.ts` |
| Storybook catalog | `src/components/Icon/iconCatalog.ts` |
| Full catalog (docs) | `src/storybook/LucideFullCatalog.tsx` |
| Storybook | Foundational → Icons |
| Master index | [docs/README.md](./README.md) |

---

## Do not

- Use emoji as system icons
- Set `color="#333"` on Lucide components directly
- Use `lucide-react` default 24px without `Icon` in DS components
- Add icon fonts (IcoMoon, etc.)
- Use filled Material icons alongside Lucide outline set
- Use Lucide for **iOS status bar** (signal, Wi‑Fi, battery) or home indicator — system chrome is in the device frame PNG ([DEVICE-RULES.md](./DEVICE-RULES.md))
