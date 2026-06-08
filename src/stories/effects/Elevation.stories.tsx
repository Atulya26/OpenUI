import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  elevationSemantic,
  zIndexPrimitive,
  zIndexSemantic,
} from '@/tokens';
import { DocPage, Panel, Section } from '@/storybook/DocPage';
import { ElevationRoleGrid, ElevationStackDemo } from '@/storybook/ElevationSpecimen';
import { DataTable } from '@/storybook/tableStyles';

const meta = {
  title: 'Foundational/Effects/Elevation',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'OpenUI z-index and elevation roles. Pair stacking order with existing shadow tokens — inspired by Apple HIG presentation layers and Material 3 elevation levels.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const OVERLAY_STACK: Parameters<typeof ElevationStackDemo>[0]['layers'] = [
  { label: 'Base content', zVar: '--z-base', tone: 'neutral' },
  { label: 'Sticky chrome', zVar: '--z-sticky', shadowVar: '--elevation-resting-shadow', tone: 'neutral' },
  { label: 'Dropdown / menu', zVar: '--z-dropdown', shadowVar: '--elevation-floating-shadow', tone: 'accent' },
  { label: 'Popover', zVar: '--z-popover', shadowVar: '--elevation-floating-shadow', tone: 'accent' },
  { label: 'Backdrop', zVar: '--z-backdrop', tone: 'scrim' },
  { label: 'Sheet', zVar: '--z-sheet', shadowVar: '--elevation-overlay-shadow', tone: 'accent' },
  { label: 'Modal', zVar: '--z-modal', shadowVar: '--elevation-modal-shadow', tone: 'accent' },
  { label: 'Toast', zVar: '--z-toast', shadowVar: '--elevation-floating-shadow', tone: 'accent' },
];

const ROLE_ITEMS = Object.entries(elevationSemantic).map(([role]) => ({
  role,
  levelVar: `--elevation-${role}-level`,
  shadowVar: `--elevation-${role}-shadow`,
  zVar: `--elevation-${role}-z`,
}));

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Effects"
      title="Elevation & z-index"
      description="Stacking order for mobile overlays plus Material 3–aligned elevation levels paired with OpenUI shadow tokens. Use semantic roles in product UI — never raw z-index numbers."
    >
      <Panel>
        <Section
          title="Mobile overlay stack"
          description="Bottom → top. Matches Apple HIG presentation order (content → chrome → popovers → sheets → modals → toasts) and Material 3 overlay priority."
        >
          <ElevationStackDemo layers={OVERLAY_STACK} />
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Semantic elevation roles"
          description="Each role bundles level, shadow, and z-index. Prefer these over picking shadow and z-index independently."
        >
          <ElevationRoleGrid items={ROLE_ITEMS} />
        </Section>
      </Panel>

      <Panel>
        <Section title="Z-index primitives" description="Gapped scale — leave room for local +1 offsets inside a band.">
          <DataTable
            headers={['Token', 'Value', 'Typical use']}
            rows={Object.entries(zIndexPrimitive).map(([key, value]) => [
              <code key="t">{`--z-index-${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`}</code>,
              value,
              key === 'base'
                ? 'Screen content'
                : key === 'sticky'
                  ? 'Tab bar, nav bar'
                  : key === 'fab'
                    ? 'FAB, floating controls'
                    : key === 'dropdown'
                      ? 'Menus, pickers'
                      : key === 'backdrop'
                        ? 'Dimmed scrim'
                        : key === 'sheet'
                          ? 'Bottom sheet, drawer'
                          : key === 'modal'
                            ? 'Dialog, full-screen cover'
                            : key === 'popover'
                              ? 'Tooltip, contextual popover'
                              : key === 'toast'
                                ? 'Snackbar, toast'
                                : 'Escape hatch — avoid in product UI',
            ])}
          />
        </Section>
      </Panel>

      <Panel>
        <Section title="Semantic z-index roles" description="Short names for components and patterns.">
          <DataTable
            headers={['CSS variable', 'Primitive ref']}
            rows={Object.entries(zIndexSemantic).map(([key, ref]) => [
              <code key="v">{`--z-${key}`}</code>,
              <code key="r">{`--z-index-${ref}`}</code>,
            ])}
          />
        </Section>
      </Panel>
    </DocPage>
  ),
};
