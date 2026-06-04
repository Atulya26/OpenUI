import type { Meta, StoryObj } from '@storybook/react-vite';
import { DocPage, Panel, Section } from '@/storybook/DocPage';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import {
  FormStackPattern,
  GridColumnsDemo,
  InlineGapDemo,
  StackGapDemo,
  TouchTargetDemo,
} from '@/storybook/LayoutPatterns';

const meta = {
  title: 'Foundational/Layout/Patterns',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ScreenInset: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Layout"
      title="Screen inset & safe areas"
      description="402×874 iPhone canvas. Top 62px and bottom 34px are system safe areas; content uses --layout-inset-screen-x inside."
    >
      <Panel>
        <div className="openui-device-story-layout">
          <DeviceFrame showSafeArea>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--text-headline-font-family)',
                fontSize: 'var(--text-headline-font-size)',
              }}
            >
              Content area
            </p>
            <p
              style={{
                margin: '8px 0 0',
                fontFamily: 'var(--text-footnote-font-family)',
                fontSize: 'var(--text-footnote-font-size)',
                color: 'var(--color-text-sub600)',
              }}
            >
              Padding = safe area + 16px horizontal inset
            </p>
          </DeviceFrame>
        </div>
      </Panel>
    </DocPage>
  ),
};

export const StackGaps: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Layout"
      title="Stack spacing"
      description="Vertical rhythm between related UI. Pick the smallest token that reads clearly."
    >
      <Panel>
        <div className="openui-layout-pattern-grid">
          <StackGapDemo token="xs" label="gap-stack-xs · 8px" />
          <StackGapDemo token="sm" label="gap-stack-sm · 12px" />
          <StackGapDemo token="md" label="gap-stack-md · 16px" />
          <StackGapDemo token="lg" label="gap-stack-lg · 24px" />
        </div>
      </Panel>
    </DocPage>
  ),
};

export const InlineAndTouch: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Layout"
      title="Inline & touch targets"
      description="Icon + label pairs use inline gaps. Interactive targets meet --layout-touch-target-min."
    >
      <Panel>
        <Section title="Inline gap">
          <InlineGapDemo />
        </Section>
        <Section title="Touch target">
          <TouchTargetDemo />
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const Grid: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Layout"
      title="Column layout"
      description="Mobile default is one column. At ≥ --layout-breakpoint-tablet, two columns for card grids when needed."
    >
      <Panel>
        <GridColumnsDemo />
      </Panel>
    </DocPage>
  ),
};

export const FormStack: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Layout"
      title="Form stack"
      description="Fields use gap-stack-sm; section spacing uses gap-section. Inputs are full width within inset."
    >
      <Panel>
        <div className="openui-layout-form-shell">
          <FormStackPattern />
        </div>
      </Panel>
    </DocPage>
  ),
};

export const RulesSummary: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Layout"
      title="AI & implementation rules"
      description="Full rule set: docs/LAYOUT-RULES.md · Start at docs/README.md or Foundational → Rules"
    >
      <Panel>
        <div className="openui-layout-rules">
          <h3 className="openui-layout-rules__heading">Hard rules</h3>
          <ul className="openui-layout-rules__list">
            <li>Use semantic layout CSS variables only — no arbitrary spacing values.</li>
            <li>Minimum touch target: 44×44px.</li>
            <li>Default screen layout: 1 column with horizontal inset.</li>
            <li>Spacing scale is 4px-based — only defined space steps exist.</li>
            <li>No dashboard 12-column grids or web-only breakpoints.</li>
          </ul>
          <h3 className="openui-layout-rules__heading">Quick checks</h3>
          <ul className="openui-layout-rules__list">
            <li>Related items → smallest fitting stack/inline gap.</li>
            <li>Major blocks → gap-section.</li>
            <li>Tablet cards → 2 columns only above breakpoint.</li>
            <li>Typography pairs: footnote labels → gap-stack-xs/sm.</li>
          </ul>
        </div>
      </Panel>
    </DocPage>
  ),
};
