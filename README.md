# OpenUI Design System

**Live Storybook:** **[https://atulya26.github.io/OpenUI/](https://atulya26.github.io/OpenUI/)** — browse tokens, foundations, and components in the browser (no install required).

Lightweight React design system for AI-generated mobile app screens, patterns, and product UI.

- **Name:** OpenUI  
- **CSS prefix:** `.openui-*` (e.g. `.openui-app-screen`, `.openui-device-frame`)  
- **Package:** `@openui/design-system`

## Token architecture

| Layer | Location | Purpose |
|-------|----------|---------|
| **Primitives** | `src/tokens/primitives/` | Raw ramps (gray, blue, …) + alpha |
| **Semantic** | `src/tokens/semantic/refs.ts` | Named roles → primitive refs; light/dark overrides |
| **Resolved tokens** | `src/tokens/themes.ts` | Final hex/rgba values per theme |
| **CSS variables** | `src/tokens/tokens.css` | `--color-*` for components |
| **Typography primitives** | `src/tokens/primitives/typography.ts` | Inter families, mobile sizes 11–36px |
| **Typography semantic** | `src/tokens/semantic/typography.ts` | HIG text styles + product roles |
| **Typography tokens** | `src/tokens/typography.ts`, `typography.css` | `--text-*` CSS variables |
| **Layout primitives** | `src/tokens/primitives/spacing.ts` | 4px spacing scale (`space-0` … `space-10`) |
| **Layout semantic** | `src/tokens/semantic/layout.ts` | Insets, stack/inline gaps, touch & grid guardrails |
| **Layout tokens** | `src/tokens/layout.ts`, `layout.css` | `--layout-*` CSS variables |
| **Radius primitives** | `src/tokens/primitives/radius.ts` | OpenUI corner radius (0–28px, full) |
| **Radius tokens** | `src/tokens/radius.ts`, `radius.css` | `--radius-*` CSS variables |
| **Shadow primitives** | `src/tokens/primitives/shadows.ts` | OpenUI effect styles |
| **Shadow tokens** | `src/tokens/shadows.ts`, `shadows.css` | `--shadow-*` CSS variables |
| **Motion primitives** | `src/tokens/primitives/motion.ts` | Durations, easing, transform values |
| **Motion tokens** | `src/tokens/motion.ts`, `motion.css` | `--motion-*` CSS variables |

## Scripts

```bash
npm install
npm run check        # typecheck + guardrails + package build + CSS budget
npm run build        # library package: dist/openui.js + dist/styles.css
npm run check:css-budget
npm run build:app    # demo app output: dist-app/
npm run storybook    # http://localhost:6006
npm run build-storybook
npm run test:visual  # Storybook test-runner: light/dark × density, RTL, overflow, touch targets
```

Storybook 10 requires Node.js **20.19+** or **22.12+**. Run `nvm use` from the repo root to use [.nvmrc](.nvmrc).

## Storybook

**Live:** [https://atulya26.github.io/OpenUI/](https://atulya26.github.io/OpenUI/) (auto-deployed from `main` via GitHub Pages)

**Local:** `npm run storybook` → http://localhost:6006

Sections:
- **Foundational → Colors → Primitives** — color ramps from Figma
- **Foundational → Colors → Semantic** — reference mappings (light & dark)
- **Foundational → Colors → Resolved** — computed values with theme toolbar
- **Foundational → Typography** — primitives, semantic refs, mobile type scale (Inter / Inter Display)
- **Components → Core** — first reusable mobile primitives and a device-frame composition
- **Foundational → Effects → Shadows** — regular, custom, colored, card, and component shadow stacks
- **Foundational → Effects → Radius** — OpenUI corner radius scale and semantic roles
- **Foundational → Motion** — duration, easing, transition contracts, and reduced-motion behavior
- **Foundational → Rules** — how to navigate `docs/*-RULES.md` for AI and humans

Use the **Theme** toolbar control to switch `data-theme` between light and dark.

Run `npm run test:visual` against a running Storybook to smoke-test every story at the iPhone viewport in light/dark, default/compact density, RTL, viewport overflow, and 44×44 interactive touch targets. Override the target when Storybook is on another port:

```bash
TARGET_URL=http://127.0.0.1:6007 npm run test:visual
```

Run `npm run check:css-budget` after `npm run build` to verify `dist/styles.css` stays within the current raw and gzip budget. Override with `OPENUI_CSS_RAW_BUDGET_BYTES` or `OPENUI_CSS_GZIP_BUDGET_BYTES` only during an intentional budget review.

### Typography

Mobile-only scale based on [Apple HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography) (default Dynamic Type sizes). Desktop dashboard display sizes (40px+) are excluded. **Inter** for text ≤19px; **Inter Display** for text ≥20px.

OpenUI self-hosts Inter assets from `src/assets/fonts/` and loads them through `@font-face` in `src/styles/global.css` with `font-display: swap`. Apps that serve the raw assets can preload the primary face before importing styles:

```html
<link
  rel="preload"
  href="/assets/fonts/InterVariable.woff2"
  as="font"
  type="font/woff2"
  crossorigin
>
```

### Icons

[Lucide React](https://lucide.dev/guide/react/) via the `Icon` component. `@/components/Icon/icons` re-exports a **curated** mobile starter set (~50 icons). The full library (~1,700+ icons) is browseable in Storybook under **Foundational → Icons → Catalog → All Lucide** — import any icon by name from `lucide-react` in app code (tree-shaken per import).

### Components

The first production component set is available from `@openui/design-system`: `Text`, `Stack`, `Screen`, `Button`, `Input`, `Field`, `Card`, `ListRow`, `Dialog`, `ActionSheet`, `Skeleton`, `Spinner`, `ProgressBar`, `EmptyState`, and `Icon`. Import `@openui/design-system/styles.css` once in the consuming app.

### Device (iPhone)

**402×874** logical viewport (iPhone 16 / 17 Pro class). Safe areas: top **62px** (Dynamic Island), bottom **34px** (home indicator). **Foundational → Layout → Device** · **[docs/DEVICE-RULES.md](docs/DEVICE-RULES.md)**

### Layout & spacing

Mobile layout based on [Apple HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout) and [Material 3 spacing structure](https://m3.material.io/foundations/layout/layout-overview/overview). **Foundational → Layout** in Storybook. AI/human guardrails: **[docs/LAYOUT-RULES.md](docs/LAYOUT-RULES.md)** and **[AGENTS.md](AGENTS.md)**.

### AI agents

| File | Role |
|------|------|
| **[AGENTS.md](AGENTS.md)** | Entry point — read first |
| **[docs/README.md](docs/README.md)** | Master index — which rules to read per task |
| **[docs/COLOR-RULES.md](docs/COLOR-RULES.md)** | Color tokens |
| **[docs/TYPOGRAPHY-RULES.md](docs/TYPOGRAPHY-RULES.md)** | Typography |
| **[docs/ICON-RULES.md](docs/ICON-RULES.md)** | Icons (Lucide) |
| **[docs/DEVICE-RULES.md](docs/DEVICE-RULES.md)** | iPhone 402×874, safe areas |
| **[docs/LAYOUT-RULES.md](docs/LAYOUT-RULES.md)** | Spacing & layout |
| **[docs/SHADOW-RULES.md](docs/SHADOW-RULES.md)** | Shadows & elevation |
| **[docs/RADIUS-RULES.md](docs/RADIUS-RULES.md)** | Corner radius |
| **[docs/MOTION-RULES.md](docs/MOTION-RULES.md)** | Motion & transitions |
| **[docs/COMPONENT-RULES.md](docs/COMPONENT-RULES.md)** | Building DS components |
| **[docs/PATTERN-RULES.md](docs/PATTERN-RULES.md)** | Screens & composite UI |
