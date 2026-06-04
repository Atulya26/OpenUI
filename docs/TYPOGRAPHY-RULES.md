# Typography rules

Rules for humans and AI when using type in OpenUI.
Reference: [Apple HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography).

**Navigation:** [docs/README.md](./README.md) · [COLOR](./COLOR-RULES.md) · [ICON](./ICON-RULES.md) · [LAYOUT](./LAYOUT-RULES.md) · [COMPONENT](./COMPONENT-RULES.md) · [PATTERN](./PATTERN-RULES.md)

---

## Hard rules (never break)

1. **Inter & Inter Display only** — No SF Pro, Roboto, system-ui as primary brand fonts in product UI. Tokens load Inter from Google Fonts in Storybook/global CSS.

2. **Family split at 20px** — **Inter** for sizes ≤19px (body UI). **Inter Display** for sizes ≥20px (titles). Enforced in `textStyles` / `--text-*` variables.

3. **No arbitrary type styles** — Use `--text-{style}-*` CSS variables or `typographyRoles` / `textStyles` from tokens. No one-off `font-size: 18px` in components.

4. **Mobile HIG scale only** — Sizes 11–36px on the ramp. **Do not** add desktop dashboard sizes (40, 48, 56, 64, 72, 80px).

5. **Semantic text styles in UI** — Prefer HIG names (`headline`, `body`, `footnote`) or product roles (`screenTitle`, `listTitle`) over raw `fontSize[17]`.

6. **Weights from tokens** — Only `400`, `500`, `600`, `700` as defined in `fontWeight`. Do not use `font-weight: 300` or `800`.

7. **Line height from tokens** — Do not override line-height to “fix” layout; adjust spacing with `--layout-gap-*` tokens.

8. **Letter-spacing from tokens** — Large display sizes use negative tracking from `letterSpacing`; do not eyeball `-0.5px`.

---

## Token cheat sheet

| Product role | HIG style | Typical use |
|--------------|-----------|-------------|
| `screenTitle` | largeTitle, bold | Navigation / primary screen title |
| `heroTitle` | title1 | Hero / feature header |
| `sectionTitle` | title2 | Section headers |
| `cardTitle` | title3 | Card headings |
| `listTitle` | headline | List row primary |
| `paragraph` / `input` | body | Body copy, inputs |
| `secondary` | subheadline | Secondary lines |
| `label` / `tertiary` | footnote | Labels, timestamps |
| `tabLabel` | caption1 | Tab bar |
| `badge` | caption2 | Badges, smallest UI text |
| `button` | headline | Button label (semibold) |

### CSS usage

```css
.my-heading {
  font-family: var(--text-large-title-font-family);
  font-size: var(--text-large-title-font-size);
  line-height: var(--text-large-title-line-height);
  font-weight: var(--text-large-title-font-weight);
  letter-spacing: var(--text-large-title-letter-spacing);
}
```

Or apply all five properties from `typographyTokens.largeTitle` in TS.

---

## Size ramp (primitives)

| Step (px) | Line height | Family |
|-----------|-------------|--------|
| 11–17 | Matched HIG | Inter |
| 20–36 | Matched HIG | Inter Display |

Full table: Storybook → Foundational → Typography → Primitives.

---

## When to use which style

| Context | Style / role |
|---------|----------------|
| One main title per screen | `largeTitle` / `screenTitle` — bold by default |
| Secondary heading | `title2` / `sectionTitle` |
| List primary line | `headline` / `listTitle` |
| Paragraph text | `body` |
| Supporting line under title | `subheadline` / `secondary` |
| Field label | `footnote` / `label` |
| Legal / meta | `caption1` or `caption2` |
| Button | `headline` (semibold) — pair with touch target layout rules |

**Rule:** One clear typographic level per element. Do not stack multiple bold sizes at the same hierarchy level.

---

## AI follow-up checklist (every typography change)

- [ ] All five properties (family, size, line-height, weight, tracking) from tokens
- [ ] No font sizes outside 11–36px ramp
- [ ] Display family only on ≥20px styles
- [ ] Primary screen titles use `screenTitle` / `largeTitle` and render bold
- [ ] No dashboard/display marketing sizes
- [ ] Vertical spacing uses layout tokens, not margin hacks on line-height
- [ ] Storybook type specimens still accurate if scale changed

---

## Allowed exceptions (comment in PR)

- **Monospace for code** — if added later, define a `code` role in tokens first; do not use browser default monospace in random components
- **Dynamic Type / accessibility scaling** — future: scale from a single multiplier; until then hold HIG default sizes

---

## File map

| What | Where |
|------|--------|
| Primitives | `src/tokens/primitives/typography.ts` |
| HIG + roles | `src/tokens/semantic/typography.ts` |
| Resolved + CSS builder | `src/tokens/typography.ts` |
| CSS variables | `src/tokens/typography.css` |
| JSON | `src/tokens/data/typography.json` |
| Storybook | Foundational → Typography |
| Master index | [docs/README.md](./README.md) |

---

## Do not

- Use `system-ui` or `-apple-system` as the primary font in components (fallback chain inside token strings is OK)
- Mix Tailwind `text-lg` / arbitrary font classes with this system
- Use `title1` for every heading on a screen
- Shrink body text below 11px (`caption2` is the floor)
- Add web-only hero type at 64px+ for “impact”
