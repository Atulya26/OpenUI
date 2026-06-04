import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  primarySemantic,
  semanticByMode,
  staticSemantic,
  type ThemeMode,
} from '@/tokens';
import { DocPage, Panel, Section } from '@/storybook/DocPage';
import { DataTable } from '@/storybook/tableStyles';

const meta = {
  title: 'Foundational/Colors/Semantic',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Semantic references map roles to primitive paths. Background, text, and stroke tokens invert between light and dark modes.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function RefTable({
  refs,
  title,
}: {
  refs: Record<string, string>;
  title: string;
}) {
  return (
    <Section title={title} meta={`${Object.keys(refs).length} tokens`}>
      <DataTable
        headers={['Token', 'Primitive reference']}
        rows={Object.entries(refs).map(([name, ref]) => [
          <code key={name} className="openui-chip">
            {name}
          </code>,
          ref,
        ])}
      />
    </Section>
  );
}

export const StaticAndPrimary: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Colors"
      title="Static & primary semantics"
      description="Tokens that stay consistent or map to brand primitives across themes."
    >
      <Panel>
        <RefTable refs={staticSemantic} title="Static {static}" />
        <RefTable refs={primarySemantic} title="Primary {primary}" />
      </Panel>
    </DocPage>
  ),
};

function ModeSemantic({ mode }: { mode: ThemeMode }) {
  const s = semanticByMode[mode];
  return (
    <Panel>
      <RefTable refs={s.bg} title={`Background {bg}`} />
      <RefTable refs={s.text} title={`Text {text}`} />
      <RefTable refs={s.stroke} title={`Stroke {stroke}`} />
      <RefTable refs={s.icon} title={`Icon {icon}`} />
      {Object.entries(s.state).map(([group, refs]) => (
        <RefTable key={group} refs={refs} title={`State / ${group}`} />
      ))}
    </Panel>
  );
}

export const LightModeRefs: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Colors"
      title="Light mode semantics"
      description="How semantic color roles resolve to gray, blue, and state primitives in light UI."
    >
      <ModeSemantic mode="light" />
    </DocPage>
  ),
};

export const DarkModeRefs: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Colors"
      title="Dark mode semantics"
      description="Inverted neutrals and alpha overlays for dark surfaces."
    >
      <ModeSemantic mode="dark" />
    </DocPage>
  ),
  globals: {
    backgrounds: { value: 'dark' },
  },
};
