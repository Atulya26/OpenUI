import type { Meta, StoryObj } from '@storybook/react-vite';
import { radiusPrimitive } from '@/tokens/primitives/radius';
import { layoutRadiusSemantic, radiusSemantic } from '@/tokens/semantic/radius';
import { DocPage, Panel, Section } from '@/storybook/DocPage';
import { RadiusScale } from '@/storybook/RadiusScale';
import { DataTable } from '@/storybook/tableStyles';

const meta = {
  title: 'Foundational/Effects/Radius',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Corner radius from Align UI 2.0 (Figma node 2839:15876). Primitives in `--radius-*`; semantic roles for controls and surfaces.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SEMANTIC_CSS: Record<keyof typeof radiusSemantic, string> = {
  control: '--radius-control',
  surface: '--radius-surface',
  surfaceLg: '--radius-surface-lg',
  pill: '--radius-pill',
};

export const Primitives: Story = {
  name: 'Primitives',
  render: () => (
    <DocPage
      eyebrow="Foundational · Effects"
      title="Corner radius"
      description="Align UI 2.0 radius scale. Device screen corners use --device-screen-radius (58px) — not this scale."
    >
      <Panel>
        <RadiusScale />
      </Panel>
      <Panel>
        <Section title="Token table">
          <DataTable
            headers={['Token', 'CSS variable', 'Value']}
            rows={Object.entries(radiusPrimitive).map(([key, px]) => [
              key,
              `--radius-${key}`,
              px === 9999 ? '9999px' : `${px}px`,
            ])}
          />
        </Section>
      </Panel>
      <Panel>
        <Section title="Semantic roles">
          <DataTable
            headers={['Role', 'CSS variable', 'Resolves to']}
            rows={Object.entries(radiusSemantic).map(([role, ref]) => [
              role,
              SEMANTIC_CSS[role as keyof typeof radiusSemantic],
              `--radius-${ref}`,
            ])}
          />
        </Section>
      </Panel>
      <Panel>
        <Section title="Legacy layout aliases">
          <DataTable
            headers={['Alias', 'CSS variable', 'Resolves to']}
            rows={Object.entries(layoutRadiusSemantic).map(([key, ref]) => [
              `layout ${key}`,
              `--layout-radius-${key}`,
              `--radius-${ref}`,
            ])}
          />
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const InContext: Story = {
  name: 'In context',
  render: () => (
    <DocPage
      eyebrow="Foundational · Effects"
      title="Radius in context"
      description="Typical mobile surfaces using semantic tokens."
    >
      <Panel>
        <div className="openui-radius-context">
          <div className="openui-radius-context__control">Control (10px)</div>
          <div className="openui-radius-context__surface">Surface card (12px)</div>
          <div className="openui-radius-context__pill">Pill</div>
        </div>
      </Panel>
    </DocPage>
  ),
};
