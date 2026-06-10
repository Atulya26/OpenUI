import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Bell,
  Button,
  Card,
  EmptyState,
  ListRow,
  ProgressBar,
  Search,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from '@/components';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/Loading and Empty States',
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
      title="Loading and empty states"
      description="Mobile feedback primitives for waiting, loading content, progress, and no-data moments."
    >
      <Panel>
        <Section
          title="Spinner"
          description="Use for compact blocking or inline activity. Add a label only when the spinner itself must be announced."
        >
          <Stack direction="horizontal" gap="lg" align="center" wrap>
            <Spinner size="sm" label="Loading small content" />
            <Spinner size="md" />
            <Spinner size="lg" color="strong" />
            <Button loading>Saving</Button>
          </Stack>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Skeleton"
          description="Use skeletons when the page structure is known and content is still arriving."
        >
          <Card variant="surface">
            <Stack gap="sm">
              <Stack direction="horizontal" gap="sm" align="center">
                <Skeleton variant="circle" size="md" />
                <Stack gap="xs">
                  <Skeleton variant="text" size="md" />
                  <Skeleton variant="text" size="sm" />
                </Stack>
              </Stack>
              <Skeleton variant="rectangle" size="lg" />
              <Skeleton variant="text" size="sm" />
            </Stack>
          </Card>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Progress"
          description="Use determinate progress when work has a known value; indeterminate when only activity is known."
        >
          <Stack gap="md">
            <ProgressBar value={42} label="Upload progress" />
            <ProgressBar value={68} tone="success" label="Storage progress" />
            <ProgressBar value={86} tone="warning" label="Limit progress" />
            <ProgressBar indeterminate tone="primary" label="Syncing" />
          </Stack>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Empty state"
          description="Use a short title, one supporting line, and one clear recovery action."
        >
          <div className="openui-device-story-layout">
            <DeviceFrame>
              <Stack gap="lg">
                <Stack gap="xs">
                  <Text as="h1" variant="screenTitle" emphasized>
                    Search
                  </Text>
                  <Text variant="secondary" color="sub">
                    Recent alerts and saved filters appear here.
                  </Text>
                </Stack>

                <Card variant="surface">
                  <EmptyState
                    icon={Search}
                    title="No matches yet"
                    description="Try a broader query or adjust filters to find saved alerts."
                    action={<Button leadingIcon={Bell}>Create alert</Button>}
                  />
                </Card>

                <Card variant="soft">
                  <ListRow
                    as="div"
                    title="Saved filters"
                    description="Filters sync when they become available."
                    trailingText="0"
                    showDivider={false}
                  />
                </Card>
              </Stack>
            </DeviceFrame>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};
