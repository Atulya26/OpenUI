import type { Meta, StoryObj } from '@storybook/react-vite';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Foundational/Rules/Index',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const RULE_FILES = [
  {
    file: 'docs/README.md',
    title: 'Master index',
    when: 'Always — start here',
  },
  {
    file: 'docs/COLOR-RULES.md',
    title: 'Colors',
    when: 'Themes, backgrounds, text, borders, state',
  },
  {
    file: 'docs/TYPOGRAPHY-RULES.md',
    title: 'Typography',
    when: 'Headings, body, labels, captions',
  },
  {
    file: 'docs/ICON-RULES.md',
    title: 'Icons',
    when: 'Lucide, Icon component, a11y',
  },
  {
    file: 'docs/DEVICE-RULES.md',
    title: 'Device (iPhone)',
    when: '402×874 canvas, safe areas, Dynamic Island',
  },
  {
    file: 'docs/LAYOUT-RULES.md',
    title: 'Layout',
    when: 'Spacing, insets, grid, touch targets',
  },
  {
    file: 'docs/SHADOW-RULES.md',
    title: 'Shadows',
    when: 'Box-shadow stacks, cards, component focus/hover',
  },
  {
    file: 'docs/ELEVATION-RULES.md',
    title: 'Elevation & z-index',
    when: 'Overlay stack, sheets, modals, menus, toasts',
  },
  {
    file: 'docs/RADIUS-RULES.md',
    title: 'Corner radius',
    when: 'Border radius on controls and surfaces',
  },
  {
    file: 'docs/MOTION-RULES.md',
    title: 'Motion',
    when: 'Transitions, animation, feedback, reduced motion',
  },
  {
    file: 'docs/COMPONENT-RULES.md',
    title: 'Components',
    when: 'Building or changing src/components/*',
  },
  {
    file: 'docs/COMPONENT-CHECKLIST.md',
    title: 'Component checklist',
    when: 'Tracking DS build progress — what to build next',
  },
  {
    file: 'docs/PATTERN-RULES.md',
    title: 'Patterns',
    when: 'Screens, forms, lists, flows',
  },
] as const;

export const ForAIAndHumans: Story = {
  name: 'How to use rules',
  render: () => (
    <DocPage
      eyebrow="Foundational · Rules"
      title="Design system rule files"
      description="AI agents: read AGENTS.md at repo root, then docs/README.md, then each *-RULES.md for areas you touch. Humans: same path for reviews and contributions."
    >
      <Panel>
        <Section title="Workflow">
          <ol className="openui-rules-ol">
            <li>Read <code>AGENTS.md</code> (repo root)</li>
            <li>Read <code>docs/README.md</code> (master index)</li>
            <li>Pick rule files for your task (table below)</li>
            <li>Open token source in <code>src/tokens/</code></li>
            <li>Verify in Storybook + run global checklist</li>
          </ol>
        </Section>
      </Panel>
      <Panel>
        <Section title="Rule files" meta={`${RULE_FILES.length}`}>
          <div className="openui-rules-table">
            {RULE_FILES.map(({ file, title, when }) => (
              <div key={file} className="openui-rules-row">
                <div>
                  <p className="openui-rules-row__title">{title}</p>
                  <code className="openui-rules-row__file">{file}</code>
                </div>
                <p className="openui-rules-row__when">{when}</p>
              </div>
            ))}
          </div>
        </Section>
      </Panel>
      <Panel>
        <div className="openui-layout-rules">
          <h3 className="openui-layout-rules__heading">Global hard rules</h3>
          <ul className="openui-layout-rules__list">
            <li>Mobile app — not a dashboard</li>
            <li>Tokens only — no magic hex or spacing</li>
            <li>Semantic tokens in product UI</li>
            <li>Motion tokens for transition and animation</li>
            <li>Light and dark themes</li>
            <li>Inter / Inter Display typography</li>
            <li>Lucide icons via Icon component</li>
          </ul>
        </div>
      </Panel>
    </DocPage>
  ),
};
