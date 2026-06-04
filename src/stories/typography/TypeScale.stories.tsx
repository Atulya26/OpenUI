import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  roleTypographyTokens,
  typographyRoles,
  typographyTokens,
  type TextStyleName,
} from '@/tokens';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel } from '@/storybook/DocPage';
import { TypeSpecimenRow } from '@/storybook/TypeSpecimen';
import { textStyle } from '@/storybook/textStyles';

const meta = {
  title: 'Foundational/Typography/Type Scale',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const higOrder: TextStyleName[] = [
  'extraLargeTitle',
  'extraLargeTitle2',
  'largeTitle',
  'title1',
  'title2',
  'title3',
  'headline',
  'body',
  'callout',
  'subheadline',
  'footnote',
  'caption1',
  'caption2',
];

export const HIGTextStyles: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Typography"
      title="Type scale"
      description="Resolved mobile styles — Inter & Inter Display only. Sized for iOS default Dynamic Type."
    >
      <Panel padding={false}>
        <div className="openui-type-stack">
          {higOrder.map((name) => (
            <TypeSpecimenRow
              key={name}
              name={name}
              token={typographyTokens[name]}
              sample={
                name.includes('caption')
                  ? 'Caption text'
                  : name.includes('Title') || name.includes('title')
                    ? 'Screen Title'
                    : undefined
              }
            />
          ))}
        </div>
      </Panel>
    </DocPage>
  ),
};

export const ProductRoles: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Typography"
      title="Product roles"
      description="Semantic aliases used in components."
    >
      <Panel padding={false}>
        <div className="openui-type-stack">
          {Object.entries(typographyRoles).map(([role, styleName]) => (
            <TypeSpecimenRow
              key={role}
              name={role}
              refLabel={styleName}
              token={roleTypographyTokens[role as keyof typeof typographyRoles]}
            />
          ))}
        </div>
      </Panel>
    </DocPage>
  ),
};

export const MobileHierarchy: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Typography"
      title="In context"
      description="How the scale composes on a typical mobile screen."
    >
      <DeviceFrame label="402×874">
        <p
          style={{
            ...textStyle('caption2'),
            margin: '0 0 8px',
            color: 'var(--color-text-soft400)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Account
        </p>
        <h1
          style={{
            ...textStyle('largeTitle'),
            margin: '0 0 8px',
            color: 'var(--color-text-strong950)',
          }}
        >
          Profile
        </h1>
        <p
          style={{
            ...textStyle('subheadline'),
            margin: '0 0 24px',
            color: 'var(--color-text-sub600)',
          }}
        >
          Manage your personal details and sign-in options.
        </p>
        <h2
          style={{
            ...textStyle('title3'),
            margin: '0 0 8px',
            color: 'var(--color-text-strong950)',
          }}
        >
          Personal info
        </h2>
        <p
          style={{
            ...textStyle('body'),
            margin: '0 0 12px',
            color: 'var(--color-text-strong950)',
          }}
        >
          Update your name, email, and phone number used for notifications.
        </p>
        <p
          style={{
            ...textStyle('footnote'),
            margin: '0 0 24px',
            color: 'var(--color-text-soft400)',
          }}
        >
          Last updated 2 days ago
        </p>
        <button
          type="button"
          style={{
            ...textStyle('headline'),
            width: '100%',
            padding: '14px 20px',
            border: 'none',
            borderRadius: 12,
            background: 'var(--color-primary-base)',
            color: 'var(--color-static-white)',
            cursor: 'pointer',
          }}
        >
          Save changes
        </button>
      </DeviceFrame>
    </DocPage>
  ),
};
