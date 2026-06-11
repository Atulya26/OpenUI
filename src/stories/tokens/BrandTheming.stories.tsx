import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Banner,
  Bell,
  Button,
  Calendar,
  Field,
  Home,
  IconButton,
  Input,
  Search,
  SegmentedControl,
  Settings,
  Stack,
  TabBar,
  Text,
} from '@/components';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Foundational/Colors/Brand theming',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Scoped brand proof for overriding primary color variables without component-level color overrides.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const primaryTokens = [
  '--color-primary-base',
  '--color-primary-dark',
  '--color-primary-darker',
  '--color-primary-alpha16',
  '--color-primary-alpha10',
];

const derivedTokens = [
  '--color-state-layer-pressed-primary',
  '--color-state-layer-selected',
  '--shadow-ring-focus-primary',
];

function TokenList({ title, tokens }: { title: string; tokens: string[] }) {
  return (
    <div className="openui-brand-theme-token-card">
      <span className="openui-brand-theme-token-card__title">{title}</span>
      <div className="openui-brand-theme-token-card__list">
        {tokens.map((token) => (
          <code key={token} className="openui-chip">
            {token}
          </code>
        ))}
      </div>
    </div>
  );
}

function BrandProofSurface({ autoFocusInput = false }: { autoFocusInput?: boolean }) {
  return (
    <div className="openui-brand-theme-proof">
      <div className="openui-brand-theme-proof__header">
        <div>
          <Text as="h3" variant="cardTitle">
            Teal brand scope
          </Text>
          <Text variant="secondary" color="sub">
            Components below only consume OpenUI semantic variables.
          </Text>
        </div>
        <IconButton
          icon={Bell}
          label="Notifications"
          variant="primary"
          appearance="outline"
          selected
        />
      </div>

      <Stack gap="md">
        <Banner
          status="success"
          title="Theme applied"
          description="Status color stays semantic while the primary action retints."
          action={<Button size="sm">Review</Button>}
        />

        <div className="openui-brand-theme-action-row">
          <Button leadingIcon={Search}>Search homes</Button>
          <IconButton
            icon={Settings}
            label="Open settings"
            variant="primary"
            appearance="fill"
          />
        </div>

        <Stack gap="sm">
          <Field
            label="Focused primary field"
            success="Success, warning, and error keep their feedback colors."
            inputProps={{
              autoFocus: autoFocusInput,
              defaultValue: 'hello@openui.dev',
              leadingIcon: Search,
            }}
          />
          <Input
            aria-label="Successful field"
            status="success"
            value="Verified"
            readOnly
          />
        </Stack>

        <SegmentedControl
          label="Availability"
          defaultValue="week"
          items={[
            { value: 'today', label: 'Today' },
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
          ]}
        />

        <TabBar
          label="Brand theme app sections"
          defaultValue="search"
          items={[
            { value: 'home', label: 'Home', icon: Home },
            { value: 'search', label: 'Search', icon: Search },
            { value: 'trips', label: 'Trips', icon: Calendar },
            { value: 'settings', label: 'Settings', icon: Settings },
          ]}
        />
      </Stack>
    </div>
  );
}

export const TealBrandScope: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Colors"
      title="Brand theming hook"
      description="Primary color retints through scoped CSS variables. State layers and focus rings derive from those variables, so component code does not need to know the brand is teal."
    >
      <Panel>
        <Section
          title="Override surface"
          description="A product theme can scope primary refs, selected and pressed-primary state layers, and the primary focus ring. Components continue to read semantic OpenUI tokens instead of hard-coding blue."
          meta="U8"
        >
          <div className="openui-brand-theme-doc-grid">
            <TokenList title="Primary refs" tokens={primaryTokens} />
            <TokenList title="Derived brand states" tokens={derivedTokens} />
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Teal scope proof"
          description="The scoped container below overrides variables only. Button, IconButton, input focus, selected TabBar, selected/pressed controls, and the Banner action all retint without component CSS overrides."
        >
          <div className="openui-brand-theme-scope openui-brand-theme-scope--teal">
            <BrandProofSurface autoFocusInput />
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const TealBrandScopeDark: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Colors"
      title="Brand theming hook · dark"
      description="The same scoped primary overrides inherit dark-mode neutrals from the active OpenUI theme."
    >
      <Panel>
        <Section
          title="Dark theme proof"
          description="Primary refs, pressed-primary state layers, selected surfaces, and focus rings stay teal while surface, text, border, and status roles follow dark mode."
        >
          <div className="openui-brand-theme-scope openui-brand-theme-scope--teal">
            <BrandProofSurface autoFocusInput />
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
  globals: {
    theme: 'dark',
    backgrounds: { value: 'dark' },
  },
};
