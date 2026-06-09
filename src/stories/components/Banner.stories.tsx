import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { Bell, Button, Field, ListRow, MapPin, Shield, Stack, Text } from '@/components';
import { Banner, type BannerStatus } from '@/components/Banner';
import { ListSection } from '@/components/ListSection';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/Banner',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const statuses: BannerStatus[] = ['info', 'success', 'warning', 'error'];

const statusCopy: Record<BannerStatus, { title: string; description: string }> = {
  info: {
    title: 'New payout schedule',
    description: 'Weekly payouts now arrive on the first business day after checkout.',
  },
  success: {
    title: 'Identity verified',
    description: 'Your profile is ready for booking requests and payment updates.',
  },
  warning: {
    title: 'Review required',
    description: 'Confirm your tax details before accepting the next reservation.',
  },
  error: {
    title: 'Payment failed',
    description: 'Update the card on file to keep automatic renewal active.',
  },
};

function SpecCell({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="openui-list-row-spec-cell">
      <div className="openui-list-row-spec-cell__example">{children}</div>
      <div className="openui-list-row-spec-cell__copy">
        <span>{title}</span>
        <p>{description}</p>
      </div>
    </div>
  );
}

function DismissibleDemo() {
  const [visible, setVisible] = useState(true);

  return visible ? (
    <Banner
      status="warning"
      title="Listing paused"
      description="Finish safety review to make this stay visible again."
      dismissible
      onDismiss={() => setVisible(false)}
    />
  ) : (
    <Banner
      status="success"
      title="Banner dismissed"
      description="This demo keeps a small confirmation in place for review."
      compact
    />
  );
}

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Banner"
      description="Mobile feedback for page-level and inline messages. It stays full-width inside the app content lane and uses restrained status color."
    >
      <Panel>
        <Section
          title="Statuses"
          description="Info and success announce politely; warning and error use alert semantics by default."
        >
          <Stack gap="sm">
            {statuses.map((status) => (
              <Banner
                key={status}
                status={status}
                title={statusCopy[status].title}
                description={statusCopy[status].description}
              />
            ))}
          </Stack>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Actions and dismiss"
          description="Use one concise action when the banner can resolve the issue in place. Dismiss remains a real mobile tap target."
        >
          <div className="openui-list-row-spec-grid">
            <SpecCell title="Inline action" description="A subtle text button keeps the hierarchy below primary page actions.">
              <Banner
                status="info"
                title="Add travel dates"
                description="Dates improve availability and price recommendations."
                actionLabel="Add dates"
                onAction={() => undefined}
              />
            </SpecCell>

            <SpecCell title="Action slot" description="Custom action content can use an existing OpenUI button when more emphasis is needed.">
              <Banner
                status="error"
                title="Renewal blocked"
                description="The current card was declined by the provider."
                action={<Button size="sm" variant="destructive" appearance="outline">Update</Button>}
              />
            </SpecCell>

            <SpecCell title="Dismissible" description="Optional close affordance for non-blocking messages.">
              <DismissibleDemo />
            </SpecCell>

            <SpecCell title="Compact" description="Dense feedback for forms, settings, and short inline confirmations.">
              <Banner
                status="success"
                title="Saved"
                description="Notification changes were applied."
                compact
              />
            </SpecCell>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const DeviceExamples: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Device examples"
      description="Banners inside realistic form and settings screens, framed by the iPhone shell without extra chrome."
    >
      <Panel>
        <div className="openui-device-story-layout">
          <DeviceFrame>
            <Stack gap="lg">
              <Stack gap="xs">
                <Text as="h1" variant="screenTitle">Trip setup</Text>
                <Text variant="secondary" color="sub">Confirm stay details before publishing.</Text>
              </Stack>

              <Banner
                status="warning"
                title="Missing check-in window"
                description="Guests need a clear arrival window before the listing can go live."
                actionLabel="Add window"
                onAction={() => undefined}
              />

              <Stack gap="sm">
                <Field
                  label="Stay name"
                  inputProps={{
                    defaultValue: 'Northline loft',
                    leadingIcon: MapPin,
                  }}
                />
                <Field
                  label="Host note"
                  hint="Keep it short and specific."
                  inputProps={{
                    placeholder: 'Welcome instructions',
                  }}
                />
              </Stack>

              <Button fullWidth>Continue</Button>
            </Stack>
          </DeviceFrame>

          <DeviceFrame>
            <Stack gap="lg">
              <Stack gap="xs">
                <Text as="h1" variant="screenTitle">Settings</Text>
                <Text variant="secondary" color="sub">Manage alerts, privacy, and trusted access.</Text>
              </Stack>

              <Banner
                status="info"
                title="Passkey available"
                description="Add a passkey for faster sign in on this device."
                compact
                actionLabel="Set up"
                onAction={() => undefined}
                dismissible
                onDismiss={() => undefined}
              />

              <ListSection title="Account">
                <ListRow leadingIcon={Bell} title="Notifications" trailingText="On" />
                <ListRow leadingIcon={Shield} title="Privacy" description="Profile visibility" />
              </ListSection>

              <ListSection title="Security" variant="soft">
                <ListRow selected leadingIcon={Shield} title="Two-factor authentication" trailingText="Enabled" trailingIcon={null} />
                <ListRow leadingIcon={Bell} title="Device alerts" trailingText="Critical" trailingIcon={null} />
              </ListSection>
            </Stack>
          </DeviceFrame>
        </div>
      </Panel>
    </DocPage>
  ),
};
