import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ActionSheet,
  Button,
  Card,
  Dialog,
  Download,
  ListRow,
  MapPin,
  Share2,
  Shield,
  Stack,
  Text,
  Trash2,
} from '@/components';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/Overlays',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => undefined;

function OverlayPhone() {
  return (
    <DeviceFrame>
      <Stack gap="lg">
        <Stack gap="xs">
          <Text as="h1" variant="screenTitle" emphasized>
            Booking
          </Text>
          <Text variant="secondary" color="sub">
            Overlay surfaces should stay compact inside the phone frame.
          </Text>
        </Stack>

        <Card variant="surface">
          <Stack gap="xs">
            <ListRow
              as="div"
              leadingIcon={MapPin}
              title="Northline loft"
              description="Jun 18-22"
              trailingText="4 nights"
            />
            <ListRow
              as="div"
              leadingIcon={Shield}
              title="Protection"
              description="Host verified"
              trailingText="On"
              showDivider={false}
            />
          </Stack>
        </Card>
      </Stack>
    </DeviceFrame>
  );
}

export const DialogExample: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Dialog"
      description="Centered mobile alerts for confirmation and brief blocking decisions."
    >
      <Panel>
        <Section
          title="Confirmation"
          description="Dialog uses the shared overlay scrim, paired exit motion, and compact mobile action rows."
        >
          <div className="openui-device-story-layout">
            <OverlayPhone />
            <DeviceFrame>
              <Dialog
                open
                placement="contained"
                status="warning"
                title="Publish changes?"
                description="Guests will see the updated house rules immediately."
                onClose={noop}
                footer={
                  <>
                    <Button appearance="transparent" variant="default" onClick={noop}>
                      Review
                    </Button>
                    <Button onClick={noop}>Publish</Button>
                  </>
                }
              />
            </DeviceFrame>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const ActionSheetExample: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="ActionSheet"
      description="A bottom action surface for phone-native choices, sharing, and destructive actions."
    >
      <Panel>
        <Section
          title="Mobile actions"
          description="Actions are full-width rows with optional icons and a separate cancel affordance."
        >
          <div className="openui-device-story-layout">
            <DeviceFrame>
              <Stack gap="lg">
                <Stack gap="xs">
                  <Text as="h1" variant="screenTitle" emphasized>
                    Stay
                  </Text>
                  <Text variant="secondary" color="sub">
                    Action sheets sit above the safe area and keep the current screen visible.
                  </Text>
                </Stack>
              </Stack>

              <ActionSheet
                open
                placement="contained"
                title="Reservation actions"
                description="Choose what to do with this request."
                onClose={noop}
                actions={[
                  {
                    id: 'share',
                    label: 'Share request',
                    description: 'Send this inquiry to a teammate.',
                    icon: Share2,
                    tone: 'primary',
                    onSelect: noop,
                  },
                  {
                    id: 'download',
                    label: 'Download details',
                    description: 'Save the reservation summary.',
                    icon: Download,
                    onSelect: noop,
                  },
                  {
                    id: 'cancel',
                    label: 'Cancel request',
                    description: 'Release the reserved dates.',
                    icon: Trash2,
                    tone: 'destructive',
                    onSelect: noop,
                  },
                ]}
              />
            </DeviceFrame>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};
