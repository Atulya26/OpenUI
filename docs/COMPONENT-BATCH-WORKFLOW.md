# Component batch workflow

Use this workflow when building several OpenUI components in parallel.

OpenUI component batches should feel like one design system pass, not four unrelated patches. The parent agent owns shared integration. Worker agents own isolated component folders and stories.

---

## Branch model

1. Start from latest `main`.
2. Create a batch branch, for example `component-batch-1`.
3. Assign workers disjoint write sets.
4. Parent integrates exports, checklist updates, docs links, and final polish.
5. Run checks before merging.

---

## Worker ownership

Workers may edit only their assigned component folders and story file. They must not edit:

- `src/components/index.ts`
- `docs/COMPONENT-CHECKLIST.md`
- global Storybook CSS
- unrelated component folders

This keeps parallel work easy to merge and review.

---

## Batch 1 - completed base controls

| Worker | Component ownership | Purpose |
|--------|---------------------|---------|
| A | `ListSection` | Grouped mobile list wrapper for settings and value rows |
| B | `Switch` | Mobile setting toggle for rows and forms |
| C | `Checkbox`, `Radio` | Native selection controls for forms and lists |
| D | `Badge`, `Chip` | Compact status metadata and filter tokens |

## Batch 2 - app-shell primitives

| Worker | Component ownership | Purpose |
|--------|---------------------|---------|
| A | `SegmentedControl` | Compact mobile selector for filters and view modes |
| B | `Avatar`, `Thumbnail` | Identity and entity media for rows and cards |
| C | `Banner` | Inline mobile feedback and page-level status |
| D | `Sheet` | Bottom sheet structure for mobile decisions |
| E | `NavigationBar` | Compact and large-title mobile screen header |

## Batch 3 - forms, navigation, and transient feedback

| Worker | Component ownership | Purpose |
|--------|---------------------|---------|
| A | `TabBar` | Bottom app navigation for top-level destinations |
| B | `SearchBar` | Mobile search entry with clear and cancel actions |
| C | `TextArea` | Multiline field matching the Input visual language |
| D | `Select` | Native mobile picker wrapper for forms |
| E | `Toast` | Transient mobile feedback and snackbar surface |

---

## Integration gates

Before the parent agent marks a batch done:

- all new components export from their own folder index
- shared barrel exports are added in `src/components/index.ts`
- component checklist statuses are updated
- stories render under `Components/*`
- `npm run typecheck` passes
- `npm run guardrails` passes
- `npm run build` passes
- `npm run build-storybook` passes with the repo Node version

---

## Review shape

Each component story should show:

- variants and sizes
- disabled, selected, invalid, or status states where relevant
- one realistic mobile use case in `DeviceFrame`
- labels that explain when to use the component, not only the prop name

For compact controls, review the visible size separately from the hit area. Chips, checkbox marks, radio marks, badges, and trailing row controls may have a 44px tap zone while the visible shape stays smaller and calmer.
