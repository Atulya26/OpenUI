import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { ListSection } from '@/components/ListSection';
import {
  Bell,
  CreditCard,
  ListRow,
  Lock,
  LogOut,
  MapPin,
  Settings,
  Shield,
  Stack,
  Text,
  User,
} from '@/components';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/ListSection',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="ListSection"
      description="A grouped mobile list surface for settings, values, and actions. Titles and footers sit outside the rounded group while direct ListRow children fill the section."
    >
      <Panel>
        <Section
          title="Grouped settings"
          description="Use ListSection when related rows should read as one mobile settings group instead of a card with row composition overrides."
        >
          <div className="openui-list-row-spec-grid">
            <SpecCell title="Surface group" description="Default settings group with a quiet surface, soft stroke, and clipped row radius.">
              <ListSection title="Account">
                <ListRow leadingIcon={User} title="Profile" description="Name, photo, and handle" />
                <ListRow leadingIcon={Bell} title="Notifications" trailingText="On" />
                <ListRow leadingIcon={Shield} title="Privacy" description="Visibility and data" />
              </ListSection>
            </SpecCell>

            <SpecCell title="Soft group" description="A flatter section for dense secondary preferences.">
              <ListSection title="Preferences" variant="soft">
                <ListRow size="sm" leadingIcon={Settings} title="Appearance" trailingText="System" />
                <ListRow size="sm" leadingIcon={MapPin} title="Language" trailingText="English" />
                <ListRow size="sm" leadingIcon={Bell} title="Reminders" trailingText="Daily" />
              </ListSection>
            </SpecCell>

            <SpecCell title="Outline group" description="Low-emphasis boundary when elevation would overstate the hierarchy.">
              <ListSection title="Security" variant="outline" footer="Review trusted devices after changing your password.">
                <ListRow leadingIcon={Shield} title="Passkey" trailingText="Enabled" />
                <ListRow leadingIcon={Lock} title="Password" description="Updated last month" />
              </ListSection>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Rows and states"
          description="Values, selection, destructive actions, and disabled rows stay row-level states. ListSection only owns the outer group."
        >
          <div className="openui-list-row-spec-grid">
            <SpecCell title="Values" description="Trailing text communicates the current setting without forcing navigation.">
              <ListSection title="Billing">
                <ListRow
                  leadingIcon={CreditCard}
                  title="Payment method"
                  description="Primary card"
                  trailingText="Visa 2048"
                  trailingIcon={null}
                />
                <ListRow
                  leadingIcon={Bell}
                  title="Renewal reminder"
                  trailingText="3 days before"
                  trailingIcon={null}
                />
              </ListSection>
            </SpecCell>

            <SpecCell title="Selected row" description="Selection tint stays inside the group and keeps the row separator contract.">
              <ListSection title="Theme" variant="soft">
                <ListRow leadingIcon={Settings} title="System" selected trailingIcon={null} />
                <ListRow leadingIcon={MapPin} title="Light" trailingIcon={null} />
                <ListRow leadingIcon={Shield} title="Dark" trailingIcon={null} />
              </ListSection>
            </SpecCell>

            <SpecCell title="Destructive and disabled" description="Action semantics remain on ListRow while the section provides compact grouping.">
              <ListSection title="Session" footer="Managed accounts may restrict password and session actions.">
                <ListRow disabled leadingIcon={Lock} title="Change password" description="Managed by your organization" />
                <ListRow destructive leadingIcon={LogOut} title="Log out" trailingIcon={null} />
              </ListSection>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Insets"
          description="Inset controls the row content lane inside the group. Use medium for standard settings and small for denser modules."
        >
          <div className="openui-list-row-spec-grid">
            <SpecCell title="Medium inset" description="Default 16px content inset, matching app content rhythm.">
              <ListSection title="Medium">
                <ListRow leadingIcon={User} title="Profile" />
                <ListRow leadingIcon={Shield} title="Privacy" />
              </ListSection>
            </SpecCell>

            <SpecCell title="Small inset" description="Compact rows while retaining the same outer surface shape.">
              <ListSection title="Small" inset="sm" variant="soft">
                <ListRow size="sm" leadingIcon={Bell} title="Alerts" />
                <ListRow size="sm" leadingIcon={MapPin} title="Region" />
              </ListSection>
            </SpecCell>

            <SpecCell title="No inset" description="For custom children that already manage their own internal spacing.">
              <ListSection title="None" inset="none" variant="outline">
                <ListRow leadingIcon={CreditCard} title="Payouts" />
                <ListRow leadingIcon={Shield} title="Keys" />
              </ListSection>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Device settings screen"
          description="A realistic phone composition inside the 370px content lane with no extra device chrome."
        >
          <div className="openui-device-story-layout">
            <DeviceFrame>
              <Stack gap="lg">
                <Stack gap="xs">
                  <Text as="h1" variant="screenTitle">Settings</Text>
                  <Text variant="secondary" color="sub">Manage account, preferences, and security.</Text>
                </Stack>

                <ListSection title="Account">
                  <ListRow leadingIcon={User} title="Profile" description="Alex Morgan" />
                  <ListRow leadingIcon={Bell} title="Notifications" trailingText="On" />
                  <ListRow leadingIcon={CreditCard} title="Billing" trailingText="Pro" />
                </ListSection>

                <ListSection title="Preferences" variant="soft">
                  <ListRow selected leadingIcon={Settings} title="Appearance" trailingText="System" trailingIcon={null} />
                  <ListRow leadingIcon={MapPin} title="Language" trailingText="English" />
                </ListSection>

                <ListSection title="Security" variant="outline" footer="Device approvals are required for sensitive changes.">
                  <ListRow leadingIcon={Shield} title="Passkey" trailingText="Enabled" />
                  <ListRow disabled leadingIcon={Lock} title="Recovery email" description="Managed by your organization" />
                </ListSection>

                <ListSection variant="soft">
                  <ListRow destructive leadingIcon={LogOut} title="Log out" trailingIcon={null} />
                </ListSection>
              </Stack>
            </DeviceFrame>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};
