import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, Calendar, Card, Clock, MapPin, Stack, Text, Users } from '@/components';
import { Select, type SelectOption } from '@/components/Select';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/Select',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const destinationOptions: SelectOption[] = [
  { value: 'lisbon', label: 'Lisbon' },
  { value: 'tokyo', label: 'Tokyo' },
  { value: 'mexico-city', label: 'Mexico City' },
  { value: 'copenhagen', label: 'Copenhagen' },
];

const timeOptions: SelectOption[] = [
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'evening', label: 'Evening' },
  { value: 'night', label: 'Night', disabled: true },
];

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
    <Card variant="outline" className="openui-select-story-cell">
      {children}
      <Stack gap="xs">
        <Text variant="listTitle">{title}</Text>
        <Text variant="tertiary" color="sub">
          {description}
        </Text>
      </Stack>
    </Card>
  );
}

function ControlledSelectExample() {
  const [destination, setDestination] = useState('tokyo');

  return (
    <Select
      label="Destination"
      leadingIcon={MapPin}
      options={destinationOptions}
      value={destination}
      onValueChange={setDestination}
    />
  );
}

function FieldLikeExample({
  label,
  message,
  tone = 'sub',
  children,
}: {
  label: string;
  message: string;
  tone?: 'sub' | 'success' | 'warning' | 'error';
  children: (messageId: string) => ReactNode;
}) {
  const messageId = `${label.toLowerCase().replaceAll(' ', '-')}-message`;

  return (
    <Stack gap="xs">
      {children(messageId)}
      <Text id={messageId} variant="tertiary" color={tone}>
        {message}
      </Text>
    </Stack>
  );
}

function SettingsForm() {
  const [region, setRegion] = useState('americas');
  const [digest, setDigest] = useState('weekly');
  const [quietHours, setQuietHours] = useState('evening');

  return (
    <DeviceFrame showSafeArea>
      <Stack gap="lg">
        <Stack gap="xs">
          <Text as="h1" variant="screenTitle">
            Settings
          </Text>
          <Text variant="secondary" color="sub">
            Mobile form controls in the OpenUI content lane.
          </Text>
        </Stack>

        <Card>
          <Stack gap="sm">
            <Select
              label="Region"
              leadingIcon={MapPin}
              options={[
                { value: 'americas', label: 'Americas' },
                { value: 'emea', label: 'Europe, Middle East, Africa' },
                { value: 'apac', label: 'Asia Pacific' },
              ]}
              value={region}
              onValueChange={setRegion}
            />
            <Select
              label="Digest"
              leadingIcon={Bell}
              options={[
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
              ]}
              value={digest}
              onValueChange={setDigest}
            />
            <Select
              label="Quiet hours"
              leadingIcon={Clock}
              options={timeOptions}
              value={quietHours}
              onValueChange={setQuietHours}
            />
          </Stack>
        </Card>

        <Card variant="soft">
          <Stack gap="xs">
            <Text variant="listTitle">Managed workspace</Text>
            <Text variant="secondary" color="sub">
              Read-only keeps managed values visible without opening the picker.
            </Text>
            <Select
              aria-label="Billing plan"
              options={[
                { value: 'team', label: 'Team plan' },
                { value: 'enterprise', label: 'Enterprise plan' },
              ]}
              value="team"
              readOnly
            />
          </Stack>
        </Card>
      </Stack>
    </DeviceFrame>
  );
}

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Select"
      description="A custom mobile select with an OpenUI trigger, tokenized popover, selected row, disabled options, and soft outlined field states."
    >
      <Panel>
        <Section
          title="Core states"
          description="Select supports placeholder, controlled value changes, disabled rows, and read-only values without using the generic browser dropdown."
        >
          <Stack direction="horizontal" gap="md" wrap>
            <SpecCell title="Placeholder" description="Empty value uses a disabled placeholder option.">
              <Select
                aria-label="Destination"
                placeholder="Choose destination"
                options={destinationOptions}
              />
            </SpecCell>
            <SpecCell title="Controlled" description="onValueChange receives the selected option value.">
              <ControlledSelectExample />
            </SpecCell>
            <SpecCell title="Disabled" description="Unavailable select is muted and non-interactive.">
              <Select
                label="Plan"
                options={[
                  { value: 'starter', label: 'Starter' },
                  { value: 'pro', label: 'Pro' },
                ]}
                value="pro"
                disabled
              />
            </SpecCell>
            <SpecCell title="Read-only" description="Value stays readable but the custom picker does not open.">
              <Select
                label="Managed plan"
                options={[
                  { value: 'team', label: 'Team' },
                  { value: 'enterprise', label: 'Enterprise' },
                ]}
                value="team"
                readOnly
              />
            </SpecCell>
          </Stack>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Sizes"
          description="Small starts at the 44px mobile target; regular and large increase field height and inset for roomier forms."
        >
          <Stack direction="horizontal" gap="md" wrap>
            <SpecCell title="Small" description="Dense repeated mobile form rows.">
              <Select
                aria-label="Small select"
                size="sm"
                placeholder="Small"
                options={destinationOptions}
              />
            </SpecCell>
            <SpecCell title="Regular" description="Default mobile form field.">
              <Select
                aria-label="Regular select"
                size="md"
                placeholder="Regular"
                options={destinationOptions}
              />
            </SpecCell>
            <SpecCell title="Large" description="Prominent setup or preference forms.">
              <Select
                aria-label="Large select"
                size="lg"
                placeholder="Large"
                options={destinationOptions}
              />
            </SpecCell>
          </Stack>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Validation"
          description="Status changes one field stroke and icon color. invalid is an alias for the error status and sets aria-invalid."
        >
          <Stack direction="horizontal" gap="md" wrap>
            <SpecCell title="Default" description="No validation feedback yet.">
              <Select aria-label="Default select" options={destinationOptions} defaultValue="lisbon" />
            </SpecCell>
            <SpecCell title="Success" description="Confirmed or available value.">
              <Select
                aria-label="Success select"
                status="success"
                options={destinationOptions}
                defaultValue="tokyo"
              />
            </SpecCell>
            <SpecCell title="Warning" description="Allowed value that needs attention.">
              <Select
                aria-label="Warning select"
                status="warning"
                options={timeOptions}
                defaultValue="evening"
              />
            </SpecCell>
            <SpecCell title="Error" description="Invalid state uses error color and aria-invalid.">
              <Select
                aria-label="Error select"
                invalid
                placeholder="Choose time"
                options={timeOptions}
              />
            </SpecCell>
          </Stack>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Icons and field examples"
          description="Leading icons use the OpenUI Icon wrapper. Field-like compositions pair the primitive with messages owned by the form."
        >
          <Stack direction="horizontal" gap="md" wrap>
            <SpecCell title="Leading icon" description="Useful for recognizable preference categories.">
              <Select
                label="Reminder"
                leadingIcon={Calendar}
                options={timeOptions}
                defaultValue="morning"
              />
            </SpecCell>
            <SpecCell title="Hint" description="Supportive message outside the select primitive.">
              <FieldLikeExample label="Team" message="Choose the team that owns new requests.">
                {(messageId) => (
                  <Select
                    label="Team"
                    leadingIcon={Users}
                    placeholder="Choose team"
                    options={[
                      { value: 'design', label: 'Design' },
                      { value: 'engineering', label: 'Engineering' },
                      { value: 'support', label: 'Support' },
                    ]}
                    aria-describedby={messageId}
                  />
                )}
              </FieldLikeExample>
            </SpecCell>
            <SpecCell title="Warning message" description="Parent form owns validation copy.">
              <FieldLikeExample label="Quiet hours" message="Night delivery is disabled for this workspace." tone="warning">
                {(messageId) => (
                  <Select
                    label="Quiet hours"
                    status="warning"
                    options={timeOptions}
                    defaultValue="evening"
                    aria-describedby={messageId}
                  />
                )}
              </FieldLikeExample>
            </SpecCell>
            <SpecCell title="Error message" description="Use invalid for blocking validation.">
              <FieldLikeExample label="Destination" message="Select a destination before continuing." tone="error">
                {(messageId) => (
                  <Select
                    label="Destination"
                    invalid
                    placeholder="Choose destination"
                    options={destinationOptions}
                    aria-describedby={messageId}
                  />
                )}
              </FieldLikeExample>
            </SpecCell>
          </Stack>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const MobileSettingsForm: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Select in a settings form"
      description="Custom select controls inside DeviceFrame keep safe-area spacing and the 370px content lane."
    >
      <Panel>
        <div className="openui-device-story-layout">
          <SettingsForm />
        </div>
      </Panel>
    </DocPage>
  ),
};
