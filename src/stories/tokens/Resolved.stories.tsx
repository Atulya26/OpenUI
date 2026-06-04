import type { Meta, StoryObj } from '@storybook/react-vite';
import { darkTokens, lightTokens } from '@/tokens';
import type { ColorTokens } from '@/tokens';
import {
  ColorSwatchGrid,
  ThemeCompare,
  ThemeShell,
} from '@/storybook/ColorSwatchGrid';
import { DocPage, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Foundational/Colors/Resolved',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Fully resolved values ready for CSS variables and component APIs.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function flatGroup(
  group: Record<string, string>,
  prefix: string,
): { name: string; value: string }[] {
  return Object.entries(group).map(([k, v]) => ({
    name: `${prefix}-${k}`,
    value: v,
  }));
}

function ResolvedView({
  tokens,
  label,
}: {
  tokens: ColorTokens;
  label: string;
}) {
  const mode = label === 'Dark' ? 'dark' : 'light';
  return (
    <ThemeShell theme={mode} label={label}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <Section title="Brand & static" meta="7">
          <ColorSwatchGrid
            columns="compact"
            swatches={[
              ...flatGroup(tokens.static, 'static'),
              ...flatGroup(tokens.primary, 'primary'),
            ]}
          />
        </Section>
        <Section title="Background" meta="6">
          <ColorSwatchGrid
            columns="compact"
            swatches={flatGroup(tokens.bg, 'bg')}
          />
        </Section>
        <Section title="Text" meta="5">
          <ColorSwatchGrid
            columns="compact"
            swatches={flatGroup(tokens.text, 'text')}
          />
        </Section>
        <Section title="Stroke & icon" meta="9">
          <ColorSwatchGrid
            columns="compact"
            swatches={[
              ...flatGroup(tokens.stroke, 'stroke'),
              ...flatGroup(tokens.icon, 'icon'),
            ]}
          />
        </Section>
        {Object.entries(tokens.state).map(([group, colors]) => (
          <Section key={group} title={`State · ${group}`} meta="4">
            <ColorSwatchGrid
              checkerboard={mode === 'dark'}
              columns="compact"
              swatches={flatGroup(colors, group)}
            />
          </Section>
        ))}
      </div>
    </ThemeShell>
  );
}

export const Light: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Colors"
      title="Resolved · Light"
      description="Computed hex and rgba values for the light theme."
    >
      <ResolvedView tokens={lightTokens} label="Light" />
    </DocPage>
  ),
};

export const Dark: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Colors"
      title="Resolved · Dark"
      description="Computed values when data-theme is dark."
    >
      <ResolvedView tokens={darkTokens} label="Dark" />
    </DocPage>
  ),
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const SideBySide: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Colors"
      title="Light & dark comparison"
      description="Side-by-side resolved tokens for theme QA."
    >
      <ThemeCompare>
        <ResolvedView tokens={lightTokens} label="Light" />
        <ResolvedView tokens={darkTokens} label="Dark" />
      </ThemeCompare>
    </DocPage>
  ),
};
