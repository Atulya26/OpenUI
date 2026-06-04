import type { Meta, StoryObj } from '@storybook/react-vite';
import { primitiveAlpha, primitiveColors } from '@/tokens';
import { ColorRamp } from '@/storybook/ColorRamp';
import { ColorSwatchGrid } from '@/storybook/ColorSwatchGrid';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Foundational/Colors/Primitives',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Raw color ramps from Align UI 2.0. Use semantic tokens in product UI — not these values directly.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPalettes: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Colors"
      title="Primitive palette"
      description="Full color ramps sourced from Align UI 2.0. Each scale is optimized for mobile surfaces and pairs with semantic tokens for light and dark themes."
    >
      <Panel>
        <div className="openui-ramp-list">
          {Object.entries(primitiveColors).map(([palette, scale]) => (
            <ColorRamp
              key={palette}
              name={palette.charAt(0).toUpperCase() + palette.slice(1)}
              swatches={Object.entries(scale)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([step, value]) => ({
                  name: `${palette} ${step}`,
                  value,
                }))}
            />
          ))}
        </div>
      </Panel>
    </DocPage>
  ),
};

export const Alpha: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Colors"
      title="Alpha primitives"
      description="Translucent overlays for tinted surfaces and dark-mode UI. Shown on a checkerboard for clarity."
    >
      <Panel>
        <Section
          title="Overlay scales"
          description="24%, 16%, and 10% opacity on brand and neutral bases."
          meta={`${Object.keys(primitiveAlpha).length} tokens`}
        >
          <ColorSwatchGrid
            checkerboard
            columns="compact"
            swatches={Object.entries(primitiveAlpha).map(([name, value]) => ({
              name,
              value,
            }))}
          />
        </Section>
      </Panel>
    </DocPage>
  ),
};
