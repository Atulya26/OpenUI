import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import {
  Bell,
  Calendar,
  Card,
  ChevronDown,
  CreditCard,
  Home,
  IconButton,
  ListRow,
  Lock,
  LogOut,
  Mail,
  MoreHorizontal,
  Separator,
  Settings,
  Shield,
  Stack,
  Text,
  User,
} from '@/components';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/ListRow',
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
      title="ListRow"
      description="A simple mobile row for navigation, settings, values, selection, and disclosure triggers. Accordion content stays in a higher-level component."
    >
      <Panel>
        <Section
          title="Common row types"
          description="A row can navigate, display a value, or expose a single trailing affordance. Keep the row purpose obvious."
        >
          <div className="openui-list-row-spec-grid">
            <SpecCell title="Navigation" description="Whole row opens another screen. Chevron is the default trailing affordance.">
              <Card>
                <ListRow leadingIcon={User} title="Profile" description="Name, photo, and identity" />
              </Card>
            </SpecCell>

            <SpecCell title="Value" description="Displays a current value without implying deeper navigation.">
              <Card>
                <ListRow
                  leadingIcon={Calendar}
                  title="Renewal"
                  description="Next billing cycle"
                  trailingText="Jun 28"
                  trailingIcon={null}
                />
              </Card>
            </SpecCell>

            <SpecCell title="Static action slot" description="Use a static row when the trailing control is the only action.">
              <Card>
                <ListRow
                  as="div"
                  leadingIcon={Bell}
                  title="Notifications"
                  description="Push and email alerts"
                  trailingIcon={null}
                  trailingSlot={<IconButton icon={MoreHorizontal} label="Notification options" size="sm" />}
                />
              </Card>
            </SpecCell>

            <SpecCell title="Disclosure trigger" description="Can trigger an accordion, but the expanded content belongs to Accordion.">
              <Card>
                <ListRow
                  leadingIcon={Shield}
                  title="Security"
                  description="Password, devices, and recovery"
                  trailingIcon={ChevronDown}
                  aria-expanded="false"
                />
              </Card>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="States"
          description="Selected, destructive, disabled, and divider states remain quiet enough for dense phone lists."
        >
          <div className="openui-list-row-spec-grid">
            <SpecCell title="Selected" description="Use for chosen options, active filters, or current destinations.">
              <Card>
                <ListRow
                  selected
                  leadingIcon={CreditCard}
                  title="Personal card"
                  description="Default payment method"
                  trailingIcon={null}
                />
              </Card>
            </SpecCell>

            <SpecCell title="Destructive" description="For log out, delete, remove, or reset actions.">
              <Card>
                <ListRow
                  destructive
                  leadingIcon={LogOut}
                  title="Log out"
                  description="End this session on the device"
                  trailingIcon={null}
                />
              </Card>
            </SpecCell>

            <SpecCell title="Disabled" description="Unavailable row with muted copy and blocked interaction.">
              <Card>
                <ListRow
                  disabled
                  leadingIcon={Lock}
                  title="Change password"
                  description="Managed by your organization"
                />
              </Card>
            </SpecCell>

            <SpecCell title="No divider" description="Use for the final row in a group or standalone rows.">
              <Card>
                <ListRow
                  leadingIcon={Mail}
                  title="Email"
                  description="alex@openui.dev"
                  trailingText="Verified"
                  trailingIcon={null}
                  showDivider={false}
                />
              </Card>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Sizes"
          description="Sizes adjust vertical rhythm while keeping touch targets at or above 44px."
        >
          <div className="openui-list-row-spec-grid">
            <SpecCell title="Small" description="Dense lists where the title carries most of the meaning.">
              <Card>
                <ListRow size="sm" leadingIcon={Home} title="Home" trailingIcon={null} />
              </Card>
            </SpecCell>

            <SpecCell title="Regular" description="Default settings and navigation row.">
              <Card>
                <ListRow size="md" leadingIcon={Settings} title="Preferences" description="Theme and display" />
              </Card>
            </SpecCell>

            <SpecCell title="Large" description="Prominent rows with more descriptive copy.">
              <Card>
                <ListRow size="lg" leadingIcon={Shield} title="Privacy checkup" description="Review app permissions and data access" />
              </Card>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Mobile settings group"
          description="Rows usually live in a card or future ListSection. Dividers separate rows inside the 370px content lane."
        >
          <div className="openui-device-story-layout">
            <DeviceFrame>
              <Stack gap="lg">
                <Stack gap="xs">
                  <Text as="h1" variant="screenTitle">Settings</Text>
                  <Text variant="secondary" color="sub">A simple grouped list built from ListRow.</Text>
                </Stack>

                <Card>
                  <ListRow leadingIcon={User} title="Account" description="Profile, handle, and identity" />
                  <ListRow leadingIcon={Bell} title="Notifications" trailingText="On" />
                  <ListRow leadingIcon={Shield} title="Security" description="Password and recovery" />
                  <ListRow
                    leadingIcon={CreditCard}
                    title="Billing"
                    description="Cards, invoices, and plan"
                    showDivider={false}
                  />
                </Card>

                <Card variant="soft">
                  <ListRow
                    destructive
                    leadingIcon={LogOut}
                    title="Log out"
                    trailingIcon={null}
                    showDivider={false}
                  />
                </Card>

                <Separator variant="text">Future component: ListSection</Separator>
              </Stack>
            </DeviceFrame>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};
