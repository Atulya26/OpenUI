import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Bell,
  Button,
  Card,
  Field,
  Home,
  ListRow,
  Settings,
  Stack,
  Text,
  User,
} from '@/components';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/Core',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Core mobile primitives"
      description="First production component set for AI-generated mobile screens: text, stacks, shell, buttons, fields, cards, and list rows."
    >
      <Panel>
        <Section title="Screen composition">
          <div className="openui-device-story-layout">
            <DeviceFrame showSafeArea>
              <Stack gap="lg">
                <Stack gap="sm">
                  <Text as="h1" variant="screenTitle">
                    Today
                  </Text>
                  <Text variant="secondary" color="sub">
                    A token-safe mobile screen built from OpenUI primitives.
                  </Text>
                </Stack>

                <Card>
                  <Stack gap="sm">
                    <Text as="h2" variant="cardTitle">
                      Quick setup
                    </Text>
                    <Field
                      label="Email"
                      hint="Used for product updates"
                      inputProps={{ type: 'email', placeholder: 'you@example.com' }}
                    />
                    <Button leadingIcon={Bell}>Continue</Button>
                  </Stack>
                </Card>

                <Card>
                  <Stack gap="xs">
                    <ListRow leadingIcon={Home} title="Home" description="Overview and recent activity" />
                    <ListRow leadingIcon={User} title="Profile" description="Identity, account, and preferences" />
                    <ListRow leadingIcon={Settings} title="Settings" description="Theme, notifications, and privacy" />
                  </Stack>
                </Card>
              </Stack>
            </DeviceFrame>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section title="Buttons">
          <Stack direction="horizontal" gap="sm" wrap>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Delete</Button>
            <Button loading>Loading</Button>
          </Stack>
        </Section>
      </Panel>
    </DocPage>
  ),
};
