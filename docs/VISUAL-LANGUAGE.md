# OpenUI visual language

OpenUI is a mobile-first design system for app screens. The visual language should feel precise, quiet, tactile, and clearly native to a phone canvas. It should not feel like a desktop dashboard, a landing page, or a generic component dump.

Use this file with [docs/README.md](./README.md), [COMPONENT-RULES.md](./COMPONENT-RULES.md), and the foundational rule files for color, type, layout, radius, shadow, and motion.

---

## Design read

OpenUI should feel like a premium mobile app kit:

- neutral canvas
- crisp controls
- readable hierarchy
- restrained elevation
- decisive active states
- full-width mobile composition inside the 370px content lane
- small, tactile motion

The system can be iOS-adjacent, but it should remain OpenUI. Do not copy platform chrome, do not add decorative web effects, and do not make components look like marketing-site sections.

---

## Surface hierarchy

| Role | Visual behavior | Use |
|------|-----------------|-----|
| Canvas | `--color-bg-weak50` | App screen background |
| Surface | `--color-bg-white0`, soft stroke, card shadow | Main grouped content |
| Soft surface | Quiet filled neutral, low or no lift | Secondary grouping, settings clusters |
| Outline surface | Transparent or white with stroke only | Low-emphasis previews and boundaries |
| Elevated surface | Stronger hierarchy, used sparingly | One important module above siblings |
| Selected surface | Primary-tinted surface with stronger primary stroke | Chosen cards, active list rows |

Principle: use the quietest surface that still separates the content. Elevation should explain hierarchy, not decorate every container.

---

## State language

| State | Rule |
|-------|------|
| Idle | Soft surface, clear label, no unnecessary decoration |
| Hover | Slight surface or stroke shift only |
| Pressed | Tiny scale feedback via motion tokens |
| Focus | One visible keyboard-focus treatment, never stacked outlines on touch-first controls |
| Selected control | Dark filled state for buttons and icon buttons |
| Selected surface | Primary-tinted background plus stronger border, not a dark block |
| Disabled | Muted text/icon, no shadow, no action affordance |
| Error | One red stroke plus message; avoid extra red fills unless the field itself needs emphasis |
| Success / warning | Advisory state colors; do not imply blocking unless the pattern says so |

Selected is not a decorative variant. It must map to real state semantics such as `aria-pressed`, `aria-selected`, or a documented parent pattern.

---

## Mobile density

Phone screens should use the full app content lane. The safe visual rule is:

- screen width: `--device-screen-width`
- app content width: `--device-content-width`
- horizontal inset: `--layout-inset-screen-x`
- touch target minimum: `--layout-touch-target-min`

Controls should feel compact but tappable:

- dense rows can use `size="sm"` but still meet 44px touch target
- default form controls use the regular size
- large controls are reserved for setup flows or prominent one-off actions
- a single CTA in a card should fill the card content width

---

## Storybook presentation

Storybook should make the mobile design system easier to judge:

- catalog examples stay close to the 370px content lane
- component state examples include a clear purpose label
- real usage examples live in `DeviceFrame`
- light and dark should be checked for surfaces, validation, and selected states
- docs chrome should use OpenUI tokens so it does not fight the component language

Avoid dumping every prop in one dense row. A component story should answer: what is this, when should I use it, and what does it feel like on a phone?

---

## Do not

- Replace Inter, Lucide, or OpenUI tokens with another design system
- Add decorative gradients, glass, blobs, or cinematic motion to base components
- Use desktop dashboard grids for component stories
- Make every surface a card
- Make every selected state dark
- Use pale selected controls where the user needs a decisive toggle state
