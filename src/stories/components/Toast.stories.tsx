import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { Bell, Check, CreditCard, MapPin, Shield, Stack, Text } from '@/components';
import { Button } from '@/components/Button';
import { Field } from '@/components/Input';
import { ListRow } from '@/components/ListRow';
import { ListSection } from '@/components/ListSection';
import { Toast, ToastViewport, type ToastStatus } from '@/components/Toast';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/Toast',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const statuses: ToastStatus[] = ['info', 'success', 'warning', 'error'];

const statusCopy: Record<ToastStatus, { title: string; message: string }> = {
  info: {
    title: 'Sync started',
    message: 'Recent changes are updating on this device.',
  },
  success: {
    title: 'Saved',
    message: 'Your preferences were applied.',
  },
  warning: {
    title: 'Connection is weak',
    message: 'Some updates may take a little longer.',
  },
  error: {
    title: 'Payment failed',
    message: 'Update your card to finish renewal.',
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

function DismissibleToastDemo() {
  const [visible, setVisible] = useState(true);

  return visible ? (
    <Toast
      status="info"
      title="Reminder set"
      message="We will notify you before checkout."
      dismissible
      onDismiss={() => setVisible(false)}
    />
  ) : (
    <Toast
      status="success"
      title="Dismissed"
      message="The notification was cleared."
      icon={Check}
    />
  );
}

function StackedToastDemo() {
  const initialToasts = [
    {
      id: 'payment',
      status: 'error' as const,
      title: 'Payment failed',
      message: 'Update the card to finish renewal.',
      actionLabel: 'Update',
    },
    {
      id: 'sync',
      status: 'info' as const,
      title: 'Syncing changes',
      message: 'Recent edits are updating on this device.',
    },
    {
      id: 'saved',
      status: 'success' as const,
      title: 'Saved',
      message: 'Your trip settings were applied.',
    },
    {
      id: 'offline',
      status: 'warning' as const,
      title: 'Connection is weak',
      message: 'Some updates may take a little longer.',
    },
  ];
  const [toasts, setToasts] = useState(initialToasts);

  return (
    <div className="openui-toast-story-device-surface">
      <Stack gap="lg">
        <Stack gap="xs">
          <Text as="h1" variant="screenTitle">
            Inbox
          </Text>
          <Text variant="secondary" color="sub">
            Review alerts without leaving the current task.
          </Text>
        </Stack>

        <ListSection title="Today">
          <ListRow leadingIcon={Bell} title="Guest message" description="Arrives tomorrow at 3 PM" />
          <ListRow leadingIcon={Shield} title="Identity check" trailingText="Done" />
          <ListRow leadingIcon={CreditCard} title="Renewal" description="Needs payment method" />
        </ListSection>

        <Button
          fullWidth
          onClick={() => setToasts(initialToasts)}
        >
          Reset stack
        </Button>
      </Stack>

      <ToastViewport placement="bottom" mode="contained" limit={3}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            status={toast.status}
            title={toast.title}
            message={toast.message}
            actionLabel={toast.actionLabel}
            onAction={toast.actionLabel ? () => undefined : undefined}
            dismissible
            autoDismissDuration={8000}
            onDismiss={() => {
              setToasts((current) => current.filter((item) => item.id !== toast.id));
            }}
          />
        ))}
      </ToastViewport>
    </div>
  );
}

function DeviceTopExample() {
  return (
    <div className="openui-toast-story-device-surface">
      <Stack gap="lg">
        <Stack gap="xs">
          <Text as="h1" variant="screenTitle">
            Trip setup
          </Text>
          <Text variant="secondary" color="sub">
            Confirm the details guests need before booking.
          </Text>
        </Stack>

        <Stack gap="sm">
          <Field
            label="Stay name"
            inputProps={{
              defaultValue: 'Northline loft',
              leadingIcon: MapPin,
            }}
          />
          <Field
            label="Check-in"
            inputProps={{
              placeholder: 'Add arrival window',
            }}
          />
        </Stack>

        <Button fullWidth>Continue</Button>
      </Stack>

      <ToastViewport placement="top" mode="contained">
        <Toast
          status="warning"
          title="Check-in missing"
          message="Add a window before publishing."
          placement="top"
          actionLabel="Add"
          onAction={() => undefined}
        />
      </ToastViewport>
    </div>
  );
}

function DeviceBottomExample() {
  return (
    <div className="openui-toast-story-device-surface">
      <Stack gap="lg">
        <Stack gap="xs">
          <Text as="h1" variant="screenTitle">
            Settings
          </Text>
          <Text variant="secondary" color="sub">
            Manage alerts, privacy, and trusted access.
          </Text>
        </Stack>

        <ListSection title="Account">
          <ListRow leadingIcon={Bell} title="Notifications" trailingText="On" />
          <ListRow leadingIcon={Shield} title="Privacy" description="Profile visibility" />
        </ListSection>

        <ListSection title="Billing" variant="soft">
          <ListRow leadingIcon={CreditCard} title="Payment method" trailingText="Visa" />
          <ListRow selected leadingIcon={Shield} title="Two-factor authentication" trailingText="Enabled" trailingIcon={null} />
        </ListSection>
      </Stack>

      <ToastViewport placement="bottom" mode="contained">
        <Toast
          status="success"
          title="Settings saved"
          message="Notification changes were applied."
          dismissible
          onDismiss={() => undefined}
        />
      </ToastViewport>
    </div>
  );
}

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Toast"
      description="Transient mobile feedback for brief confirmations and recoverable issues. Toasts float inside the 370px content lane and keep actions short."
    >
      <Panel>
        <Section
          title="Statuses"
          description="Info and success announce politely. Warning and error use alert semantics by default."
        >
          <Stack gap="sm" className="openui-toast-story-stack">
            {statuses.map((status) => (
              <Toast
                key={status}
                status={status}
                title={statusCopy[status].title}
                message={statusCopy[status].message}
              />
            ))}
          </Stack>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Actions and dismiss"
          description="Use one concise action when the user can resolve the feedback in place."
        >
          <div className="openui-list-row-spec-grid">
            <SpecCell title="Action" description="Short labels work best in the narrow mobile lane.">
              <Toast
                status="error"
                title="Renewal blocked"
                message="The current card was declined."
                actionLabel="Update"
                onAction={() => undefined}
              />
            </SpecCell>

            <SpecCell title="Dismissible" description="Dismiss is optional and remains a full touch target.">
              <DismissibleToastDemo />
            </SpecCell>

            <SpecCell title="No icon" description="For very light confirmations, the icon can be suppressed.">
              <Toast
                status="success"
                title="Copied"
                message="Invite link copied to clipboard."
                icon={false}
              />
            </SpecCell>

            <SpecCell title="Message only" description="A single short line can stay compact without losing semantics.">
              <Toast status="info" message="Offline changes will sync later." />
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Stack and gesture"
          description="Viewport management keeps three visible toasts, places older messages behind the newest, pauses the timer during interaction, and allows horizontal swipe dismiss."
        >
          <div className="openui-device-story-layout">
            <DeviceFrame>
              <StackedToastDemo />
            </DeviceFrame>
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
      description="Contained toast viewports in the iPhone frame keep top feedback below the island and bottom feedback above the home indicator."
    >
      <Panel>
        <div className="openui-device-story-layout">
          <DeviceFrame>
            <DeviceTopExample />
          </DeviceFrame>

          <DeviceFrame>
            <DeviceBottomExample />
          </DeviceFrame>
        </div>
      </Panel>
    </DocPage>
  ),
};
