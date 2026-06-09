import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import {
  Bell,
  Button,
  Calendar,
  Card,
  CardHeader,
  CreditCard,
  ListRow,
  MapPin,
  Stack,
  Text,
  Trash2,
  User,
} from '@/components';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';
import { Sheet } from '../../components/Sheet';

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onClose: { action: 'close requested' },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => undefined;

function PhoneSurface({ children }: { children: ReactNode }) {
  return (
    <DeviceFrame>
      <Stack gap="lg">
        <Stack gap="xs">
          <Text as="h1" variant="screenTitle">
            Stay
          </Text>
          <Text variant="secondary" color="sub">
            Bottom sheets keep choices close to the current mobile context.
          </Text>
        </Stack>

        <Card variant="surface">
          <CardHeader>
            <Text as="h2" variant="cardTitle">
              Lakeside studio
            </Text>
            <Text variant="tertiary" color="sub">
              Jun 18-22 - Two guests
            </Text>
          </CardHeader>
        </Card>

        <Stack gap="sm">
          <ListRow
            as="div"
            leadingIcon={Calendar}
            title="Dates"
            description="Flexible check-in after 3 PM"
            trailingText="4 nights"
          />
          <ListRow
            as="div"
            leadingIcon={MapPin}
            title="Neighborhood"
            description="Quiet block near the station"
            trailingText="8 min"
          />
          <ListRow
            as="div"
            leadingIcon={Bell}
            title="Alerts"
            description="Price and availability updates"
            trailingText="On"
            showDivider={false}
          />
        </Stack>

        {children}
      </Stack>
    </DeviceFrame>
  );
}

export const Basic: Story = {
  args: {
    open: true,
    title: 'Reservation details',
    dismissLabel: 'Close reservation details',
  },
  render: (args) => (
    <DocPage
      eyebrow="Components"
      title="Sheet"
      description="A mobile bottom sheet for focused choices, confirmations, and scrollable supporting content."
    >
      <Panel>
        <Section
          title="Basic structure"
          description="The sheet renders a scrim, optional handle, dialog panel, title, close button, body, and footer."
        >
          <div className="openui-device-story-layout">
            <PhoneSurface>
              <Sheet
                {...args}
                onClose={args.onClose ?? noop}
                placement="contained"
                footer={
                  <>
                    <Button appearance="transparent" variant="default" onClick={args.onClose ?? noop}>
                      Later
                    </Button>
                    <Button onClick={args.onClose ?? noop}>Confirm</Button>
                  </>
                }
              >
                <Stack gap="sm">
                  <Text variant="paragraph">
                    Review the stay details without leaving the current screen.
                  </Text>
                  <Text variant="secondary" color="sub">
                    The panel uses OpenUI surface, elevation, radius, motion, and safe-area tokens.
                  </Text>
                </Stack>
              </Sheet>
            </PhoneSurface>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const ScrollContent: Story = {
  args: {
    open: true,
  },
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Scrollable sheet"
      description="Long content scrolls inside the dialog body while the footer remains available above the safe area."
    >
      <Panel>
        <Section
          title="Content body"
          description="Use size for the panel height and let the body own overflow on mobile."
        >
          <div className="openui-device-story-layout">
            <PhoneSurface>
              <Sheet
                open
                placement="contained"
                size="large"
                title="Guests and rules"
                dismissLabel="Close guests and rules"
                onClose={noop}
                footer={<Button fullWidth>Save changes</Button>}
              >
                <Stack gap="sm">
                  {[
                    'Adults',
                    'Children',
                    'Infants',
                    'Pets',
                    'Quiet hours',
                    'Parking',
                    'Accessibility',
                    'Check-in notes',
                    'House manual',
                    'Cancellation',
                  ].map((item, index) => (
                    <ListRow
                      key={item}
                      as="div"
                      leadingIcon={index % 2 === 0 ? User : CreditCard}
                      title={item}
                      description="OpenUI rows keep the sheet readable and tappable."
                      trailingText={index % 2 === 0 ? 'Edit' : 'View'}
                      showDivider={index < 9}
                    />
                  ))}
                </Stack>
              </Sheet>
            </PhoneSurface>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const DestructiveConfirmation: Story = {
  args: {
    open: true,
  },
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Destructive confirmation"
      description="Destructive sheets should keep the consequence visible and reserve red for the committed action."
    >
      <Panel>
        <Section
          title="Confirmation"
          description="A calm surface with a clear title, direct copy, and a destructive footer action."
        >
          <div className="openui-device-story-layout">
            <PhoneSurface>
              <Sheet
                open
                placement="contained"
                title="Cancel request?"
                dismissLabel="Close cancellation confirmation"
                onClose={noop}
                footer={
                  <>
                    <Button appearance="outline" variant="default">
                      Keep request
                    </Button>
                    <Button variant="destructive" leadingIcon={Trash2}>
                      Cancel
                    </Button>
                  </>
                }
              >
                <Stack gap="sm">
                  <Text variant="paragraph">
                    This removes the pending request and releases the reserved dates.
                  </Text>
                  <Text variant="secondary" color="sub">
                    The host will no longer see this reservation inquiry.
                  </Text>
                </Stack>
              </Sheet>
            </PhoneSurface>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const Sizes: Story = {
  args: {
    open: true,
  },
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Sheet sizes"
      description="Size controls the vertical panel commitment; content remains the default for compact decisions."
    >
      <Panel>
        <Section
          title="Device examples"
          description="Stories use contained placement so the sheet remains inside the iPhone frame."
        >
          <div className="openui-device-story-layout">
            <DeviceFrame>
              <Sheet
                open
                placement="contained"
                size="medium"
                title="Medium sheet"
                dismissLabel="Close medium sheet"
                onClose={noop}
                footer={<Button fullWidth>Apply</Button>}
              >
                <Stack gap="sm">
                  <Text variant="paragraph">
                    Medium sheets are useful for small forms, filters, and focused option groups.
                  </Text>
                  <ListRow
                    as="div"
                    leadingIcon={Calendar}
                    title="Trip length"
                    description="Weekend"
                    trailingText="2 nights"
                    showDivider={false}
                  />
                </Stack>
              </Sheet>
            </DeviceFrame>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};
