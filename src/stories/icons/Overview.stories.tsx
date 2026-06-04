import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home } from '@/components/Icon/icons';
import { Icon } from '@/components/Icon';
import { iconColor, iconSize, iconStrokeWidth } from '@/tokens/icons';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Foundational/Icons/Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Icons via [Lucide React](https://lucide.dev/guide/react/) — tree-shakable SVG components wrapped by OpenUI `Icon` for size and color tokens.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Icons"
      title="Sizes"
      description="Mobile presets: 16px inline, 20px UI, 24px navigation & touch areas. Matches Lucide default at lg."
    >
      <Panel>
        <div className="openui-icon-demo-row">
          {(Object.entries(iconSize) as [keyof typeof iconSize, number][]).map(
            ([token, px]) => (
              <div key={token} className="openui-icon-demo-cell">
                <div className="openui-icon-demo-preview">
                  <Icon icon={Home} size={token} color="strong" />
                </div>
                <p className="openui-icon-demo-label">{token}</p>
                <p className="openui-icon-demo-meta">{px}px</p>
              </div>
            ),
          )}
        </div>
      </Panel>
    </DocPage>
  ),
};

export const Colors: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Icons"
      title="Semantic colors"
      description="Icon colors map to --color-icon-* tokens and update with light/dark theme."
    >
      <Panel>
        <div className="openui-icon-demo-row openui-icon-demo-row--wrap">
          {(Object.keys(iconColor) as (keyof typeof iconColor)[])
            .filter((c) => c !== 'inherit')
            .map((color) => (
              <div key={color} className="openui-icon-demo-cell">
                <div
                  className={`openui-icon-demo-preview ${color === 'white' ? 'openui-icon-demo-preview--dark' : ''}`}
                >
                  <Icon icon={Home} size="lg" color={color} />
                </div>
                <p className="openui-icon-demo-label">{color}</p>
              </div>
            ))}
        </div>
      </Panel>
    </DocPage>
  ),
};

export const StrokeWidth: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Icons"
      title="Stroke width"
      description="Lucide defaults to 2px stroke. Use presets for subtle weight shifts — avoid mixing stroke widths on the same screen."
    >
      <Panel>
        <div className="openui-icon-demo-row">
          {(
            Object.entries(iconStrokeWidth) as [
              keyof typeof iconStrokeWidth,
              number,
            ][]
          ).map(([token, width]) => (
            <div key={token} className="openui-icon-demo-cell">
              <div className="openui-icon-demo-preview">
                <Icon icon={Home} size="lg" color="strong" stroke={token} />
              </div>
              <p className="openui-icon-demo-label">{token}</p>
              <p className="openui-icon-demo-meta">{width}px</p>
            </div>
          ))}
        </div>
      </Panel>
    </DocPage>
  ),
};

export const Usage: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Icons"
      title="Usage"
      description="Import icons individually for tree-shaking (~1,700+ available on lucide.dev). Wrap with Icon for token-based size and color. Storybook also lists the full set under Catalog → All Lucide."
    >
      <Panel>
        <Section title="Import pattern">
          <pre className="openui-code-block">
            {`import { Icon } from '@/components/Icon';
import { Home, Settings } from '@/components/Icon/icons';

<Icon icon={Home} size="lg" color="strong" />
<Icon icon={Settings} size="md" color="sub" label="Settings" />`}
          </pre>
        </Section>
        <Section title="Live example">
          <div className="openui-icon-toolbar">
            <Icon icon={Home} size="lg" color="primary" label="Home" />
            <Icon icon={Home} size="md" color="sub" />
            <Icon icon={Home} size="sm" color="soft" />
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};
