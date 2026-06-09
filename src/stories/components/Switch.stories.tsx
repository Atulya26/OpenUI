import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from '@/components/Switch';
import {
  Bell,
  Card,
  ListRow,
  Lock,
  Mail,
  Shield,
  Stack,
  Text,
  User,
} from '@/components';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: {
    label: 'Switch',
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

function SpecCell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card variant="outline" padding="sm">
      <Stack direction="horizontal" gap="md" align="center" justify="between">
        <Stack gap="xs">
          <Text variant="listTitle">{title}</Text>
          <Text variant="secondary" color="sub">
            {description}
          </Text>
        </Stack>
        {children}
      </Stack>
    </Card>
  );
}

function ControlledSwitch({
  label,
  defaultChecked = false,
  size = 'md',
}: {
  label: string;
  defaultChecked?: boolean;
  size?: 'sm' | 'md';
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <Switch
      label={label}
      checked={checked}
      size={size}
      onClick={() => setChecked((current) => !current)}
    />
  );
}

function SwitchRowsExample() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  return (
    <Card>
      <ListRow
        as="div"
        leadingIcon={Bell}
        title="Push alerts"
        description="Bookings, reminders, and replies"
        trailingIcon={null}
        trailingSlot={
          <Switch
            label="Push alerts"
            checked={pushEnabled}
            onClick={() => setPushEnabled((current) => !current)}
          />
        }
      />
      <ListRow
        as="div"
        leadingIcon={Mail}
        title="Email summaries"
        description="Weekly digest and product news"
        trailingIcon={null}
        trailingSlot={
          <Switch
            label="Email summaries"
            checked={emailEnabled}
            onClick={() => setEmailEnabled((current) => !current)}
          />
        }
        showDivider={false}
      />
    </Card>
  );
}

function DeviceSettingsExample() {
  const [notifications, setNotifications] = useState(true);
  const [privateMode, setPrivateMode] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  return (
    <DeviceFrame>
      <Stack gap="lg">
        <Stack gap="xs">
          <Text as="h1" variant="screenTitle">
            Settings
          </Text>
          <Text variant="secondary" color="sub">
            Switches sit in trailing slots without turning the full row into a nested control.
          </Text>
        </Stack>

        <Card>
          <ListRow
            as="div"
            leadingIcon={Bell}
            title="Notifications"
            description="Time-sensitive alerts"
            trailingIcon={null}
            trailingSlot={
              <Switch
                label="Notifications"
                checked={notifications}
                onClick={() => setNotifications((current) => !current)}
              />
            }
          />
          <ListRow
            as="div"
            leadingIcon={Shield}
            title="Privacy mode"
            description="Hide previews on lock screen"
            trailingIcon={null}
            trailingSlot={
              <Switch
                label="Privacy mode"
                checked={privateMode}
                onClick={() => setPrivateMode((current) => !current)}
              />
            }
          />
          <ListRow
            as="div"
            leadingIcon={Lock}
            title="Security alerts"
            description="New sign-ins and device changes"
            trailingIcon={null}
            trailingSlot={
              <Switch
                label="Security alerts"
                checked={securityAlerts}
                onClick={() => setSecurityAlerts((current) => !current)}
              />
            }
            showDivider={false}
          />
        </Card>

        <Card variant="soft">
          <ListRow
            as="div"
            leadingIcon={User}
            title="Managed account"
            description="Organization policy"
            trailingIcon={null}
            trailingSlot={<Switch label="Managed account" checked disabled />}
            showDivider={false}
          />
        </Card>
      </Stack>
    </DeviceFrame>
  );
}

export const Default: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Switch"
      description="A mobile switch primitive for settings rows and forms. It uses a native button, role=switch, and aria-checked."
    >
      <Panel>
        <Section
          title="Core states"
          description="Off is a quiet neutral track; on is a decisive primary track. The button hit area stays at least 44px."
        >
          <Stack gap="sm">
            <SpecCell title="Default" description="Uncontrolled switch ready for settings and forms.">
              <Switch label="Default switch" />
            </SpecCell>
            <SpecCell title="Interactive" description="Controlled example with caller-owned checked state.">
              <ControlledSwitch label="Interactive switch" defaultChecked />
            </SpecCell>
          </Stack>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const On: Story = {
  render: () => (
    <DocPage eyebrow="Components" title="Switch on" description="Checked state uses primary fill and moves the thumb to the trailing edge.">
      <Panel>
        <SpecCell title="On" description="Use for enabled settings with immediate effect.">
          <Switch label="On switch" defaultChecked />
        </SpecCell>
      </Panel>
    </DocPage>
  ),
};

export const Off: Story = {
  render: () => (
    <DocPage eyebrow="Components" title="Switch off" description="Unchecked state uses a soft neutral track and a raised thumb.">
      <Panel>
        <SpecCell title="Off" description="Use for disabled-by-choice settings.">
          <Switch label="Off switch" />
        </SpecCell>
      </Panel>
    </DocPage>
  ),
};

export const Disabled: Story = {
  render: () => (
    <DocPage eyebrow="Components" title="Disabled switches" description="Disabled switches mute the track and remove thumb shadow.">
      <Panel>
        <Stack gap="sm">
          <SpecCell title="Disabled off" description="Unavailable unchecked state.">
            <Switch label="Disabled off switch" disabled />
          </SpecCell>
          <SpecCell title="Disabled on" description="Unavailable checked state.">
            <Switch label="Disabled on switch" checked disabled />
          </SpecCell>
        </Stack>
      </Panel>
    </DocPage>
  ),
};

export const Sizes: Story = {
  render: () => (
    <DocPage eyebrow="Components" title="Switch sizes" description="Size changes the visual track, not the minimum touch target.">
      <Panel>
        <Stack gap="sm">
          <SpecCell title="Small" description="Dense settings rows and compact forms.">
            <ControlledSwitch label="Small switch" size="sm" defaultChecked />
          </SpecCell>
          <SpecCell title="Regular" description="Default switch size for mobile settings.">
            <ControlledSwitch label="Regular switch" defaultChecked />
          </SpecCell>
        </Stack>
      </Panel>
    </DocPage>
  ),
};

export const ListRowUsage: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Switch in ListRow"
      description="When a switch is the trailing control, render ListRow as a static row so the switch remains the only button."
    >
      <Panel>
        <Section title="Trailing slot" description="ListRow owns text and structure; Switch owns the interactive state.">
          <SwitchRowsExample />
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const DeviceSettings: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Device settings sample"
      description="A compact settings screen inside the 402px iPhone frame and 370px content lane."
    >
      <Panel>
        <div className="openui-device-story-layout">
          <DeviceSettingsExample />
        </div>
      </Panel>
    </DocPage>
  ),
};

export const WithAriaLabel: Story = {
  render: () => (
    <DocPage eyebrow="Components" title="Native aria-label" description="Callers can provide the accessible name through native button aria props instead of label.">
      <Panel>
        <SpecCell title="aria-label" description="Useful when the visible label is owned by a surrounding form pattern.">
          <Switch aria-label="Use system appearance" defaultChecked />
        </SpecCell>
      </Panel>
    </DocPage>
  ),
};
