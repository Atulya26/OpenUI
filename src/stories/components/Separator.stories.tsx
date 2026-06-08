import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, ListRow, Separator, Stack, Text, User, Settings, Bell } from '@/components';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/Separator',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function SpecCell({
  label,
  note,
  children,
}: {
  label: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div className="openui-separator-spec-cell">
      <div className="openui-separator-spec-cell__example">{children}</div>
      <div className="openui-separator-spec-cell__copy">
        <span>{label}</span>
        <p>{note}</p>
      </div>
    </div>
  );
}

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Separators"
      description="Separators divide mobile content without adding interaction. Use line for rows, block for section breaks, and text for labeled groups."
    >
      <Panel>
        <Section
          title="Types"
          description="Each separator fills its container by default. Use bleed when a mobile screen needs a full canvas-width divider."
        >
          <div className="openui-separator-spec-grid">
            <SpecCell label="Line" note="A thin divider for rows, lists, and compact groups.">
              <Separator />
            </SpecCell>
            <SpecCell label="Block" note="An 8/12/16px section break for stacked mobile sections.">
              <Separator variant="block" />
            </SpecCell>
            <SpecCell label="Text" note="A labeled separator for dated, grouped, or alternate content.">
              <Separator>Today</Separator>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Block sizes"
          description="Block separators use layout gap tokens, so section breaks stay on the mobile spacing grid."
        >
          <div className="openui-separator-spec-grid">
            <SpecCell label="Small block" note="8px: tight grouping inside dense flows.">
              <Separator variant="block" size="sm" />
            </SpecCell>
            <SpecCell label="Regular block" note="12px: default section separation.">
              <Separator variant="block" size="md" />
            </SpecCell>
            <SpecCell label="Large block" note="16px: stronger visual pause between sections.">
              <Separator variant="block" size="lg" />
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Tone"
          description="Tone controls visual weight while staying neutral and non-interactive."
        >
          <div className="openui-separator-spec-grid">
            <SpecCell label="Subtle" note="Quietest separation on soft surfaces.">
              <Separator tone="subtle" />
            </SpecCell>
            <SpecCell label="Soft" note="Default separator tone.">
              <Separator tone="soft" />
            </SpecCell>
            <SpecCell label="Strong" note="Use sparingly for clearer content boundaries.">
              <Separator tone="strong" />
            </SpecCell>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const MobileSeparators: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Mobile separator usage"
      description="Bleed separators fill the iPhone canvas width, while default separators stay inside the 370px content column."
    >
      <Panel>
        <div className="openui-device-story-layout">
          <DeviceFrame showSafeArea>
            <Stack gap="lg">
              <Stack gap="sm">
                <Text as="h1" variant="screenTitle">
                  Settings
                </Text>
                <Text variant="secondary" color="sub">
                  Full-width separators can break sections without entering unsafe areas.
                </Text>
              </Stack>

              <Card>
                <Stack gap="xs">
                  <ListRow leadingIcon={User} title="Profile" description="Name, photo, and identity" />
                  <Separator />
                  <ListRow leadingIcon={Bell} title="Notifications" description="Push, email, and reminders" />
                  <Separator />
                  <ListRow leadingIcon={Settings} title="Preferences" description="Theme and display settings" />
                </Stack>
              </Card>

              <Separator variant="block" bleed />

              <Stack gap="sm">
                <Separator bleed>Account</Separator>
                <Card variant="soft">
                  <Stack gap="sm">
                    <Text variant="listTitle">Subscription</Text>
                    <Text variant="secondary" color="sub">
                      Text separators are useful when the label itself is part of the scan path.
                    </Text>
                  </Stack>
                </Card>
              </Stack>
            </Stack>
          </DeviceFrame>
        </div>
      </Panel>
    </DocPage>
  ),
};
