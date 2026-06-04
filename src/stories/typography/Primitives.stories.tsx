import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from '@/tokens';
import { DocPage, Panel } from '@/storybook/DocPage';
import { DataTable } from '@/storybook/tableStyles';

const meta = {
  title: 'Foundational/Typography/Primitives',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Families: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Typography"
      title="Font families"
      description="Inter for UI text at 19px and below. Inter Display for headings at 20px and above — mirroring SF Text / SF Display on iOS."
    >
      <div className="openui-stat-grid">
        <div className="openui-stat-card">
          <p className="openui-stat-card__label">Inter · UI text</p>
          <p
            style={{
              margin: 0,
              fontFamily: fontFamily.inter,
              fontSize: 17,
              lineHeight: '22px',
            }}
          >
            Body, labels, captions, and controls
          </p>
        </div>
        <div className="openui-stat-card">
          <p className="openui-stat-card__label">Inter Display · Headings</p>
          <p
            style={{
              margin: 0,
              fontFamily: fontFamily.interDisplay,
              fontSize: 28,
              lineHeight: '34px',
              letterSpacing: '-0.022em',
            }}
          >
            Titles & hero type
          </p>
        </div>
      </div>
    </DocPage>
  ),
};

export const SizeScale: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Typography"
      title="Size ramp"
      description="Mobile scale from Apple HIG default Dynamic Type. Dashboard sizes (40px+) excluded."
    >
      <Panel>
        <DataTable
          headers={['Step', 'Size', 'Line height', 'Tracking', 'Family', 'Preview']}
          rows={Object.keys(fontSize)
            .map(Number)
            .sort((a, b) => b - a)
            .map((k) => {
              const key = k as keyof typeof fontSize;
              const size = fontSize[key];
              const family =
                size >= 20 ? 'Inter Display' : 'Inter';
              return [
                key,
                `${size}px`,
                `${lineHeight[key]}px`,
                letterSpacing[key],
                family,
                <span
                  key="preview"
                  style={{
                    fontFamily:
                      size >= 20
                        ? fontFamily.interDisplay
                        : fontFamily.inter,
                    fontSize: size,
                    lineHeight: `${lineHeight[key]}px`,
                    letterSpacing: letterSpacing[key],
                  }}
                >
                  Aa
                </span>,
              ];
            })}
        />
      </Panel>
    </DocPage>
  ),
};

export const Weights: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Typography"
      title="Weights"
      description="Available font weights for Inter and Inter Display."
    >
      <Panel>
        <div className="openui-type-stack">
          {Object.entries(fontWeight).map(([name, value]) => (
            <div key={name} className="openui-type-row">
              <div className="openui-type-row__meta">
                <p className="openui-type-row__name">{name}</p>
                <span className="openui-chip">{value}</span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontFamily: fontFamily.inter,
                  fontSize: 17,
                  lineHeight: '22px',
                  fontWeight: value,
                }}
              >
                The quick brown fox
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </DocPage>
  ),
};
