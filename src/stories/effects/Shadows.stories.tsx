import type { Meta, StoryObj } from '@storybook/react-vite';
import { DocPage, Panel, Section } from '@/storybook/DocPage';
import { ShadowSpecimenGrid, type ShadowSpecimenItem } from '@/storybook/ShadowSpecimen';

const meta = {
  title: 'Foundational/Effects/Shadows',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'OpenUI shadow effect styles. Use `--shadow-*` tokens only — component stacks are pre-defined for future wiring.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const REGULAR: ShadowSpecimenItem[] = [
  { name: 'regular-shadow / x-small', cssVar: '--shadow-regular-x-small' },
  { name: 'regular-shadow / medium', cssVar: '--shadow-regular-medium' },
];

const CARD: ShadowSpecimenItem[] = [
  { name: 'card-shadow / large', cssVar: '--shadow-card-large' },
];

const CUSTOM: ShadowSpecimenItem[] = [
  { name: 'custom-shadows / x-small', cssVar: '--shadow-custom-x-small' },
  { name: 'custom-shadows / small', cssVar: '--shadow-custom-small' },
  { name: 'custom-shadows / medium', cssVar: '--shadow-custom-medium' },
  { name: 'custom-shadows / large', cssVar: '--shadow-custom-large' },
];

const COLORED: ShadowSpecimenItem[] = [
  { name: 'colored-shadows / gray', cssVar: '--shadow-colored-gray' },
  { name: 'colored-shadows / blue', cssVar: '--shadow-colored-blue' },
  { name: 'colored-shadows / purple', cssVar: '--shadow-colored-purple' },
  { name: 'colored-shadows / orange', cssVar: '--shadow-colored-orange' },
  { name: 'colored-shadows / green', cssVar: '--shadow-colored-green' },
  { name: 'colored-shadows / primary', cssVar: '--shadow-colored-primary' },
];

const COMPONENTS: ShadowSpecimenItem[] = [
  { name: 'components / tooltip', cssVar: '--shadow-component-tooltip' },
  {
    name: 'components / buttons / primary-focus',
    cssVar: '--shadow-component-button-primary-focus',
  },
  {
    name: 'components / buttons / important-focus',
    cssVar: '--shadow-component-button-important-focus',
  },
  {
    name: 'components / buttons / error-focus',
    cssVar: '--shadow-component-button-error-focus',
  },
  {
    name: 'components / fancy-buttons / neutral',
    cssVar: '--shadow-component-fancy-button-neutral',
  },
  {
    name: 'components / fancy-buttons / primary',
    cssVar: '--shadow-component-fancy-button-primary',
  },
  {
    name: 'components / fancy-buttons / error',
    cssVar: '--shadow-component-fancy-button-error',
  },
  {
    name: 'components / fancy-buttons / stroke',
    cssVar: '--shadow-component-fancy-button-stroke',
  },
  { name: 'components / toggle / switch', cssVar: '--shadow-component-toggle-switch' },
  {
    name: 'components / custom-button / Button',
    cssVar: '--shadow-component-custom-button',
  },
  {
    name: 'components / custom-button / Hover',
    cssVar: '--shadow-component-custom-button-hover',
  },
  {
    name: 'components / custom-input / Default',
    cssVar: '--shadow-component-custom-input-default',
  },
  {
    name: 'components / custom-input / Hover',
    cssVar: '--shadow-component-custom-input-hover',
  },
  {
    name: 'components / custom-input / Active',
    cssVar: '--shadow-component-custom-input-active',
  },
];

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Effects"
      title="Shadows"
      description="OpenUI effect styles for mobile elevation. Prefer semantic aliases (--shadow-surface-card, --shadow-elevation-subtle) in product UI when possible."
    >
      <Panel>
        <Section title="Regular" meta={`${REGULAR.length}`}>
          <ShadowSpecimenGrid items={REGULAR} />
        </Section>
      </Panel>
      <Panel>
        <Section title="Card" meta={`${CARD.length}`}>
          <ShadowSpecimenGrid items={CARD} />
        </Section>
      </Panel>
      <Panel>
        <Section title="Custom" meta={`${CUSTOM.length}`}>
          <ShadowSpecimenGrid items={CUSTOM} />
        </Section>
      </Panel>
      <Panel>
        <Section title="Colored" meta={`${COLORED.length}`}>
          <ShadowSpecimenGrid items={COLORED} />
        </Section>
      </Panel>
      <Panel>
        <Section title="Components" meta={`${COMPONENTS.length}`}>
          <p className="openui-shadow-grid__note">
            Reserved for future Button, Input, Tooltip, and Toggle wiring. Use these
            variables when implementing component states — do not duplicate stacks in CSS.
          </p>
          <ShadowSpecimenGrid items={COMPONENTS} compact />
        </Section>
      </Panel>
    </DocPage>
  ),
};
